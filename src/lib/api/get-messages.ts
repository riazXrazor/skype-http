import { Incident } from "incident";
import _ from "lodash";
import { Context } from "../interfaces/api/context";
// import { Conversation } from "../interfaces/api/conversation";
import * as io from "../interfaces/http-io";
import { Message as NativeMessage } from "../interfaces/native-api/conversation";
import * as messagesUri from "../messages-uri";
// import { formatConversation } from "../utils/formatters";

interface MessagesBody {
  messages: NativeMessage[];
  _metadata: {
    lastCompleteSegmentEndTime: number; // timestamp
    lastCompleteSegmentStartTime: number; // timestamp
    forwardLink: string; // url
    backwardLink: string; // url
    syncState: string; // url
  };
}

interface GetMessagesQuery {
  startTime: string; // a timestamp ?
  view: "msnp24Equivalent" | string;
  pageSize: string;
  // targetType: string; // seen: Passport|Skype|Lync|Thread
}

export async function getMessages(
  io: io.HttpIo,
  apiContext: Context,
  conversationId: string,
): Promise<NativeMessage[]> {
  const query: GetMessagesQuery = {
    startTime: "2",
    pageSize: "30",
    view: "supportsExtendedHistory|msnp24Equivalent|supportsMessageProperties",
    // targetType: "Passport|Skype|Lync|Thread",
  };

  const requestOptions: io.GetOptions = {
    uri: messagesUri.messages(
      apiContext.registrationToken.host,
      messagesUri.DEFAULT_USER,
      conversationId,
    ),
    cookies: apiContext.cookies,
    queryString: query,
    headers: {
      RegistrationToken: apiContext.registrationToken.raw,
    },
  };
  const res: io.Response = await io.get(requestOptions);

  if (res.statusCode !== 200) {
    return Promise.reject(new Incident("net", "Unable to fetch messages"));
  }
  const body: MessagesBody = JSON.parse(res.body);
  return body.messages;
}
