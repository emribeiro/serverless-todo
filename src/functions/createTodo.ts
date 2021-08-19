import { document } from "src/utils/dynamodbclient";
import { v4 as uuidV4} from "uuid";

export const handle = async (event) => {

    const { userid } = event.pathParameters;
    const { title, deadline } = JSON.parse(event.body);    


    
    await document.put({
        TableName: "todos",
        Item: {
            id: uuidV4(),
            user_id: userid,
            title,
            done: false,
            deadline: new Date(deadline).toLocaleDateString()
        }
    }).promise();

    return {
        statusCode: 201,
        body: JSON.stringify({
            message: "TODO Created!"
        }),
        headers: {
            "Content-Type": "appplication/json"
        } 
    }

}