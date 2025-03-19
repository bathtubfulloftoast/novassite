import 'dotenv/config'; // Ensure this is at the top

export async function handler(event, context) {
    const API_KEY = process.env.DISCORD_API_KEY;
    const userid = event.queryStringParameters.userid;  // assuming the userid is passed as a query parameter

    // Construct the URL with the provided userid
    const url = `https://discord.com/api/v10/users/${userid}`;

    try {
        const response = await fetch(url, {
            method: 'GET', // Equivalent to -X GET in curl
            headers: {
                'Authorization': `Bot ${API_KEY}`,  // Replace with your token
                'Content-Type': 'application/json; charset=utf-8',  // Set encoding to UTF-8
            },
        });

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch data" }),
        };
    }
}
