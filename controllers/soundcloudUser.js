



router.get('/', function(req, res) {
	db.team.findAll()
	.then(function(result) {
		res.render('allTeams', {teams: result});
	})
	.catch(function(error) {
		res.status(404).send('Sorry');
	});
});


router.delete('/:name', function(req, res){
	db.team.destroy({
		where: {name: req.params.name}
	}).then(function() {
		res.send({message: 'successful deletion'});
	})
});