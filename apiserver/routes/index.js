module.exports = function(app, Monster){
//  모든 몬스터 리스트를 받아옴.
    app.get('/api/monsters', function(req,res){
        Monster.find(function(err, monsters){
            if (err) return res.status(500).send({
                error: 'database failure'
            });
            res.json(monsters);
        })
    });
//    id값으로 하나의 몬스터 정보를 받아옴.
    app.get('/api/monsters/:monster_id',function(req,res){
        Monster.findOne({_id : req.params.monster_id}, function(err, monster){
            if (err) return res.status(500).json({error: err});
            if (!monster) return res.status(404).json({error: 'monster not found'});
            res.json(monster);
        })
    });
//    몬스터 이름에 맞는 몬스터데이터를 받아옴.
    app.get('/api/monsters/name/:name', function(req,res){
        Monster.find({name: req.params.name}, {_id:0, name: 1, hp: 1, mp:1, level: 1}, function(err, monsters){
            if(err) return res.status(500).json({error: err});
            if(monsters.length === 0) return res.status(404).json({error: 'monster not found'});
            res.json(monsters);
        })
    });
//    몬스터를 생성함
    app.post('/api/monsters',function(req,res){
        var monster = new Monster();
        monster.name = req.body.name;
        monster.hp = req.body.hp;
        monster.mp = req.body.mp;
        monster.level = req.body.level;

        monster.save(function(err){
            if (err){
                console.error(err);
                res.json({result: 0});
                return;
            }
            res.json({result: 1});
        });
    });
//    몬스터 설정변경
    app.put('/api/monsters/:monster_id', function(req,res){
        Monster.findById(req.params.monster_id, function(err, monster){
            if (err) return res.status(500).json({error: 'database failure'});
            if(!monster) return res.status(404).json({error: 'monster not found'});

            if(req.body.name) monster.name = req.body.name;
            if(req.body.hp) monster.hp = req.body.hp;
            if(req.body.mp) monster.mp = req.body.mp;
            if(req.body.level) monster.level = req.body.level;

            monster.save(function(err){
                if(err) res.status(500).json({error: 'failed to update'});
                res.json({ message: 'monster updated'});
            });
        });
    });
//    몬스터 삭제
    app.delete('/api/monsters/:monster_id',function(req,res) {
        Monster.remove({_id: req.params.monster_id}, function(err,output){
            if(err) return res.status(500).json({error: "database failure"});
        //    삭제는 따로 메세지를 주지 않기로한다.
            res.status(204).end();

        })
    });
}