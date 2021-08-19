import { document } from "src/utils/dynamodbclient";


export const handle = async (event) => {

    const { userid } = event.pathParameters;

    const response = await document.scan({
        TableName: "todos",
        FilterExpression: "user_id = :userid",
        ExpressionAttributeValues: {
            ":userid": userid
        }
    }).promise();


    return {
        statusCode: 200,
        body: JSON.stringify(response.Items),
        headers: {
            "Content-Type": "appplication/json"
        } 
    }

}