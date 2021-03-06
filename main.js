const {
WAConnection,
MessageType,
Presence,
Mimetype,
GroupSettingChange
} = require('@adiwajshing/baileys')
const fs = require('fs')
const gcdetect = JSON.parse(fs.readFileSync('./database/gcdetect.json'))
const welkom = JSON.parse(fs.readFileSync('./database/welkom.json'))
const { banner, start, success } = require('./lib/functions')
const { color } = require('./lib/color')
require('./index.js')
nocache('./index.js', module => console.log(`${module} Telah Di Update ✓`))
const starts = async (gils = new WAConnection()) => {
gils.logger.level = 'warn'
gils.version = [2, 2143, 8]
gils.browserDescription = ["GilsBot", "safari", "windows 10"];
console.log(banner.string)
gils.on('qr', () => {
console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan bang'))})
fs.existsSync('./session.json') && gils.loadAuthInfo('./session.json')
gils.on('connecting', () => {
start('2', 'Connecting...')})
gils.on('open', () => {
success('2', 'Connected')})
await gils.connect({timeoutMs: 30*1000})
fs.writeFileSync('./session.json', JSON.stringify(gils.base64EncodedAuthInfo(), null, '\t'))
gils.on('chat-update', async (message) => {
require('./index.js')(gils, message)})
const setting = JSON.parse(fs.readFileSync('./setting.json'))
const owner = setting.OwnerNumber
const htod = `${owner}@s.whatsapp.net`

// Send Message
const sendButImage = async (id, text1, desc1, gam1, but = [], options = {}) => {
kma = gam1;
mhan = await gils.prepareMessage(id, kma, MessageType.image);
buttonMessages = {
imageMessage: mhan.message.imageMessage,
contentText: text1,
footerText: desc1,
buttons: but,
headerType: 4,
}
gils.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
}
const sendButLocation = async (id, text1, desc1, gam1, but = [], options = {}) => {
kma = gam1
mhan = await gils.prepareMessage(id, kma, location)
const buttonMessages = {
locationMessage: mhan.message.locationMessage,
contentText: text1,
footerText: desc1,
buttons: but,
headerType: 6
}
gils.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
}
// owner
gils.on("CB:Call", json => {
let call
calling = JSON.parse(JSON.stringify(json))
call = calling[1].from
gils.sendMessage(call, `*Maaf Nomor Anda Di Block Karna Menelpon/Vc Bot!*`, MessageType.text)
.then(() => gils.blockUser(call, "add"))
})
gils.on("group-update", async (anu) => {
metdata = await gils.groupMetadata(anu.jid);
if (anu.announce == "false") {
teks = `- [ Group Opened ] -\n\n_Group telah dibuka oleh admin_\n_Sekarang semua member bisa mengirim pesan_`;
gils.sendMessage(metdata.id, teks, MessageType.text);
console.log(`- [ Group Opened ] -\n\nIn ${metdata.subject}`);
} else if (anu.announce == "true") {
teks = `- [ Group Close ] -\n\n_Group telah ditutup oleh admin_\n_Sekarang hanya admin yang dapat mengirim pesan_`;
gils.sendMessage(metdata.id, teks, MessageType.text);
console.log(`- [ Group Closed ] - \n\nIn ${metdata.subject}`);
} else if (!anu.desc == "") {
tag = anu.descOwner.split("@")[0] + "@s.whatsapp.net";
teks = `- [ Group Description Change ] -\n\nDeskripsi Group telah diubah oleh Admin @${
anu.descOwner.split("@")[0]
}\n Deskripsi Baru : ${anu.desc}`;
gils.sendMessage(metdata.id, teks, MessageType.text, {
contextInfo: { mentionedJid: [tag] },
});
console.log(`- [ Group Description Change ] - \n\nIn ${metdata.subject}`);
} else if (anu.restrict == "false") {
teks = `- [ Group Setting Change ] -\n\nEdit Group info telah dibuka untuk member\nSekarang semua member dapat mengedit info Group Ini`;
gils.sendMessage(metdata.id, teks, MessageType.text);
console.log(`- [ Group Setting Change ] - In ${metdata.subject}`);
} else if (anu.restrict == "true") {
teks = `- [ Group Setting Change ] -\n\nEdit Group info telah ditutup untuk member\nSekarang hanya admin group yang dapat mengedit info Group Ini`;
gils.sendMessage(metdata.id, teks, MessageType.text);
console.log(`- [ Group Setting Change ] - In ${metdata.subject}`);
}
})
gils.on('group-participants-update', async (anu) => {
try {
mdata = await gils.groupMetadata(anu.jid)
console.log(anu)
if (anu.action == 'add') { //Function ini error bang 🗿
num = anu.participants[0]
/*try {
ppUrl = await gils.getProfilePicture(num)
} catch {
ppUrl = 'https://i.ibb.co/6BRf4Rc/Hans-Bot-No-Profile.png'
}
img = await getBuffer(ppUrl)
teks = `Hi @${num.split('@')[0]}\nSelamat datang di\n*${mdata.subject}*\n`
sendButImage(anu.jid, teks, `Create By GilsBot`, img,but = [{buttonId:`apaaja`, 
buttonText:{displayText: 'WELCOME'},type:1}], options = {contextInfo: {mentionedJid: [num, htod]}})
} else if (anu.action == 'remove') {
num = anu.participants[0]
try {
kuburan = 'https://telegra.ph/file/f9c6f4a3043bd313e9afb.jpg'
} catch {
kuburan = 'https://telegra.ph/file/f9c6f4a3043bd313e9afb.jpg'
}
img = await getBuffer(kuburan)
teks = `Yah kok keluar\n@${num.split('@')[0]}\nJangan lupa balik lagi ke\n*${mdata.subject}*`
sendButImage(anu.jid, teks, `Create By GilsBot`, img,but = [{buttonId: `Hello World!`, buttonText: {displayText: `AMIN`}, type: 1}], options = {contextInfo: {mentionedJid: [num, htod]}})
} else if (anu.action == 'promote') {
num = anu.participants[0]
*/try {
ppUrl = await gils.getProfilePicture(num)
} catch {
ppUrl = 'https://i.ibb.co/6BRf4Rc/Hans-Bot-No-Profile.png'
}
img = await getBuffer(ppUrl)
teks = `「 PROMOTE - DETECTED 」\n\nNama : @${num.split("@")[0]}\nStatus : Member -> Admin\nGroup : ${mdata.subject}`
sendButImage(anu.jid, teks, ``, img,but = [{buttonId: `Hello World!`, buttonText: {displayText: `SELAMAT KAK`}, type: 1}], options = {contextInfo: {mentionedJid: [num]}})
} else if (anu.action == 'demote') {
num = anu.participants[0]
try {
ppUrl = await gils.getProfilePicture(num)
} catch {
ppUrl = 'https://i.ibb.co/6BRf4Rc/Hans-Bot-No-Profile.png'
}
img = await getBuffer(ppUrl)
teks = `「 DEMOTE - DETECTED 」\n\nNama : @${num.split("@")[0]}\nStatus : Admin -> Member\nGroup : ${mdata.subject}`
sendButImage(anu.jid, teks, ``, img,but = [{buttonId: `Hello World!`, buttonText: {displayText: `SABAR YA`}, type: 1}], options = {contextInfo: {mentionedJid: [num]}})
}
} catch (e) {
console.log(e)
}
})
gils.on('group-update', async (anu) => {
try { 
console.log(anu)
from = anu.jid
group = await gils.groupMetadata(anu.jid)
if (!anu.desc == '') {
tag = anu.descOwner.replace('@c.us', '@s.whatsapp.net')
gils.sendMessage(group.id, `Group Description Change\n\n• Admin : @${tag.split("@")[0]}\n• Group : ${group.subject}\n• descTime : ${anu.descTime}\n• descID : ${anu.descId}\n• descNew : ${anu.desc}`, MessageType.text, {contextInfo: { mentionedJid: [tag]}})
} else if (!anu.restrict == '') {
gils.sendMessage(group.id, `Group Restrict Change\n\n• Group : ${group.subject}\n• groupId : ${anu.jid}\n• restrict : ${anu.restrict}`, MessageType.text)
} else if (!anu.announce == '') {
gils.sendMessage(group.id, `Group Announce Change\n\n• Group : ${group.subject}\n• groupId : ${anu.jid}\n• announce : ${anu.announce}`, MessageType.text)
} 
} catch(err) {
e = String(err)
console.log(e)
}
})
}
function nocache(module, cb = () => { }) {
console.log('Freshpack!',`'${module}'`, 'A Function By GilsBot')
fs.watchFile(require.resolve(module), async () => {
await uncache(require.resolve(module))
cb(module)})}
function uncache(module = '.') {
return new Promise((resolve, reject) => {
try {
delete require.cache[require.resolve(module)]
resolve()
} catch (e) {
reject(e)}})}

starts()