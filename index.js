const {Telegraf,Markup}=require("telegraf")
const token="8070238662:AAHvg9gz9DnmhLr0K28ReFoWDDZ3pV_R9Ns"
const fs=require("fs")
const bot=new Telegraf(token)
const axios=require("axios")


bot.start((ctx)=>{
    ctx.reply("Assalomu alaykum hush kelibsiz\n /products= mahsulotlarni korish uchun \n /list royhatni korishga \n yoki mahsulot nomini kiriting ")
})

bot.command("products", async(ctx)=>{
    let {data}= await axios.get("https://bac-endcrud-1.onrender.com/products")
    data.forEach(e => {
        ctx.reply(`nomi: ${e.name}, narhi: $${e.price} ,${e.desc}`)
    });
})

bot.command("list", async(ctx)=>{
    let {data}= await axios.get("https://bac-endcrud-1.onrender.com/products")
    let message=''
    data.forEach(e => {
        message+=(`\n nomi: ${e.name}--$ ${e.price}`)
    });
    ctx.reply(message)
})

bot.on("text", async (ctx) => {
    const text = ctx.message.text;
        const { data } = await axios.get("https://bac-endcrud-1.onrender.com/products");
        
        const matched = data.find((e) => e.name.toLowerCase() === text.toLowerCase());

        if (!matched) {
            return ctx.reply("Bunday mahsulot topilmadi.");
        }
        ctx.reply(`nomi: ${matched.name},   narhi: $${matched.price} ,${matched.desc}`);

});

bot.launch()