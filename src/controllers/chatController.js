// Chat
exports.chatPage = (req, res) => {
    res.render('pages/chat',{ user: req.user })
}