import { Markup } from "telegraf";
import { Lang } from "../lang/lang.interface";
import * as ruMessages from "../lang/ru.json";
import * as enMessages from "../lang/en.json";

export function start(userLanguage: string) {
    const messages: Lang = userLanguage === "ru" ? ruMessages : enMessages;
    return Markup.keyboard(messages.keyboards.start, { columns: 2 }).resize(true).oneTime(true);
}