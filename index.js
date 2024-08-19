const TelegramApi = require('node-telegram-bot-api');
const token = '7240620668:AAF0Y7-11Hs358-AnSjv3TnjqmLdmFzsy_Q';
const bot = new TelegramApi(token, { polling: true });
const channelId = '-1002225246920';

const buttonsOfStart = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{text: 'Подписаться на канал', url: "https://t.me/channelForCheckUsers", callback_data: 'subscribe'}],
      [{text: 'Забрать подарки', callback_data: 'takeGifts'}],
    ]
  })
}


const start = () => {
  bot.on("polling_error", err => console.log(err.data.error.message));

  bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === '/start') {
      await bot.sendPhoto(chatId, 'img/bot-start.jpg');

      await bot.sendMessage(chatId, `🤘 Давайте знакомиться! 

Меня зовут Андрей:


Здесь вы получите доступ к полезным материалам от меня и моей команды. Предприниматели и эксперты выстроят непрерывный поток прогретых клиентов, маркетологи освоят новые практические инструменты и получат возможность зарабатывать больше. 


Условия получения доступа — подписка на канал https://t.me/channelForCheckUsers 
В нем я делюсь личным опытом построения маркетинга. 

Подписывайся и забирай доступы 🚀`, buttonsOfStart);
    }
  });

  bot.on('callback_query', async msg => {
    try {
      switch(msg.data) {
        case "takeGifts":
          const subscribe = await bot.getChatMember(channelId, msg.from.id);
          console.log(subscribe);
          if(subscribe.status == 'left' || subscribe.status == 'kicked') {
            await bot.sendMessage(msg.message.chat.id, `Не увидели Вашу подписку
            
Условия получения доступа — подписка на канал https://t.me/channelForCheckUsers
В нем я делюсь личным опытом построения маркетинга.

Подписывайся и забирай доступы 🚀`,buttonsOfStart, {
              parse_mode: 'HTML'
            })
          break;
          } else {
            await bot.sendMessage(msg.message.chat.id, `Отлично! Увидели подписку 😎

Обещанные доступы к полезным материалам придут в следующем сообщении.

А пока хочу вас приятно удивить. В этом боте вы получите гораздо больше, чем доступ к онлайн-практикуму 🔥

Здесь собрано более 30 полезных материалов, дающих результат на всех уровнях маркетинга: мышление, стратегия, воронки, охваты, трафик, продажи. Решения, представленные в боте, проверены более чем на 200 компаниях в РФ, Европе и США 🤘

Каждую неделю вы будете получать новые полезные материалы. Закрепите бот, чтобы не пропустить их 📌`, {
              parse_mode: 'HTML'
            });

            await bot.sendMessage(msg.message.chat.id, `Лови доступы к обещанным материалам, которые усилят твой маркетинг и позволят выйти на новый уровень 👇

✅ моя сехма «Как перейти от точечных рекламных действий к маркетинговой системе и выйти на оборот 360 млн ₽» `, {
              parse_mode: 'HTML'
            });

            await bot.sendPhoto(msg.message.chat.id, 'img/gift-1.jpg');
          }
          break;
      }
    }
    catch(error) {
      console.log(error);
    }

  })

}

start();