interface BotResponse {
    text: string;
    actions?: { label: string; action: string }[];
    reply?: boolean;
    type?: 'new' | 'reply' | 'edit';
    copy?: string;
}

declare const registerBot: (
    token: string,
    handler: (message: string, userId: string, user: any) => Promise<BotResponse | null> | BotResponse | null
) => void;


// Botingizning tokenini bu yerga kiriting (createBot dan olgan tokeningiz)
const MY_BOT_TOKEN = '3q3cFWarhLZlr.qnEzxnPuJiaz0OfSY52';

// registerBot funksiyasi avtomatik ravishda serverdan yuklanadi
registerBot(MY_BOT_TOKEN, async (command, bot, user) => {
    const lower = command.toLowerCase().trim();

    if (lower === '/start') {
        return {
            text: `Salom, ${user.name}! 👋\n⚠️Eslatma: Hozirda bu botga malumotlar saqlash kelmagan. Tez orada keladi hozircha psdagi Malumotlarni bosing!\n\n Admin: @oyshaxaitbayeva99`,
            reply: true,
            actions: [
                { label: "📊 Malumotlar", action: "/stats" },
            ]
        };
    }

    if (lower === '/stats') { // Bu yerda foydalanuvchi haqida ma'lumotlarni ko'rsatamiz
        return {
            copy: user.email, // Emailni copy qilish imkoniyatini beramiz
            text: `📊 Sizning ma'lumotlaringiz:\n\nIsm: ${user.name}\nUsername: @${user.username}\nEmail: ${user.email}\nVerified: ${user.verified ? '✅' : '❌'}`,
            reply: true
        };
    }

   
    // more commands can be added here...

    // Agar buyruq tanilmasa, foydalanuvchiga xabar yuboramiz
    return "Kechirasiz, bu buyruqni tushunmadim. /start ni bosing.";
});