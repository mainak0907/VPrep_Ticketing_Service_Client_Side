import dbConnect from '../../utils/dbConnect';
import Ticket from '../../models/Ticket';

export async function POST(request) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body
    const { issue, email, rollNumber, severity, companyName, category } = await request.json();

    // Create a new ticket using the Mongoose model
    const newTicket = new Ticket({
        issue,
        email,
        rollNumber,
        severity,
        companyName,
        category,
        reply: '', // Initial reply field is empty
        status: 'Open', // Initial status is set to Open
        createdAt: new Date(), // Optional: timestamp for when the ticket was created
    });

    // Save the ticket to MongoDB
    await newTicket.save();

    // Return a response with the created ticket
    return new Response(JSON.stringify(newTicket), { status: 201 });

  } catch (error) {
    console.error('Error creating ticket:', error);
    return new Response(JSON.stringify({ message: 'Failed to create ticket' }), { status: 500 });
  }
}

export async function GET() { // Removed 'request' parameter here
  try {
    // Connect to the database
    await dbConnect();

    // Retrieve all tickets from the database
    const tickets = await Ticket.find().sort({ createdAt: -1 });

    // Return the tickets in the response
    return new Response(JSON.stringify(tickets), { status: 200 });

  } catch (error) {
    console.error('Error fetching tickets:', error);
    return new Response(JSON.stringify({ message: 'Failed to fetch tickets' }), { status: 500 });
  }
}
