import {ParsedUserId} from "./index";

export type Status = "Hidden" | "Online" | "Away" | "Busy";

export interface Location {
  country: string; // almost certainly an enum...
  city?: string;
}

export interface Phone {
  number: string; // pattern: /^+\d+$/  (with country code)
  type: number; // enum, seen: 2
}

export interface Contact {
  id: string; // username
  person_id: string; // [0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}
  type: "skype" | string; // enum ?
  display_name: "string";
  authorized: boolean; // accepted contact request ?
  blocked: boolean;
  avatar_url: string; // Canonical form: https://api.skype.com/users/{id}/profile/avatar
  locations?: Location[];
  phones?: Phone[];
  name: {
    first: string;
    surname?: string; // also last-name ?
    nickname: string; // username, it is NOT the local nickname that you can modify
  };
}

export interface EventMessage {
  id: number;
  type: string;
  resourceType: string;
  time: Date;
  resourceLink: string;
  resource: Resource;
}

export interface Resource {
  type: "Text" | "RichText" /* | "Typing" | ... */;
  id: string;
  composeTime: Date;
  arrivalTime: Date;
  from: ParsedUserId; // username
  conversation: string; // conversationId
  content: string;
}

export interface TextResource extends Resource {
  type: "Text";
  clientId: string; // An id set by the client
  content: string;
}

export interface RichTextResource extends Resource {
  type: "RichText";
  clientId: string; // An id set by the client
  content: string;
}

export interface NewMessage {
  textContent: string;
}