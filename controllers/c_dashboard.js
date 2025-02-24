module.exports =
{
    dashboard: async (req, res) => {
        res.render('dashboard', {user: req.user})
    }
}