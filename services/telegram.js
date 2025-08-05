const axios = require("axios");

const BOT_TOKEN = "8493994813:AAEftWCJfsEc53HGs9JBk1Bd89tPpgkFEQs";
const CHAT_ID = "5147596302";

exports.sendTelegramMessage = async(text) =>{
    try{
        await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{
            chat_id : CHAT_ID,
            text : text,
            parse_mode : "HTML"
        });
    }
    catch(err){
        console.error("Telegram mesaj gönderilemedi:", err.message);
    }
}