(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{168:function(e,t){},169:function(e,t,a){e.exports=a.p+"static/media/Logo.4b14043b.svg"},199:function(e,t,a){e.exports=a(348)},204:function(e,t,a){},213:function(e,t,a){},215:function(e,t,a){},348:function(e,t,a){"use strict";a.r(t);var n={};a.r(n),a.d(n,"setActiveArea",function(){return z});var o=a(0),s=a.n(o),r=a(56),i=a.n(r),l=(a(204),a(24)),c=a(25),m=a(30),d=a(29),u=a(31),b=a(371),h=a(358),p=a(26),v=a(80),f=a.n(v),g=a(168),E=a(23),y=(a(213),a(355)),j=a(349),w=a(365),_=a(360),x=a(169),O=a.n(x),T=(a(215),function(e){function t(e,a){var n;Object(l.a)(this,t),n=Object(m.a)(this,Object(d.a)(t).call(this,e,a));var o=localStorage.getItem("selectedArea");return null===o&&(o=0),n.state={opened:!0},n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"Sidebar"},s.a.createElement("header",{className:"App-header"},s.a.createElement(_.a,{to:"/"},s.a.createElement(j.a,{src:O.a,alt:"The Death of Cain: Online Area Builder",title:"The Death of Cain: Online Area Builder"})),s.a.createElement("nav",null,s.a.createElement(w.a,{text:!0,vertical:!0},s.a.createElement(w.a.Item,{as:_.a,to:"/areas/"},"Areas"),0!==this.props.areas.activeArea&&s.a.createElement("span",null,s.a.createElement(w.a.Item,{as:_.a,to:"/rooms/"},"Rooms"),s.a.createElement(w.a.Item,{as:_.a,to:"/mobs/"},"Mobs"),s.a.createElement(w.a.Item,{as:_.a,to:"/objects/"},"Objects"))))))}}]),t}(o.Component));var I=Object(y.a)(Object(p.b)(function(e){return e},function(e){return{}})(T)),k=a(187),S=a(38),N=a(46),A=a(16),C=a(366),D=a(370),M=a(356),R=a(362),X=a(364),H=a(111),L=a(363),q=a(359),F=a(368),V=a(357),P={dbVersion:"1.0",dbName:"tdoc_olc",dbSize:2097152,dbDescription:"Local Storage database for the Online Area Builder for The Death of Caine mud."},W=a(329),B=function(e){function t(e,a){var n;return Object(l.a)(this,t),(n=Object(m.a)(this,Object(d.a)(t).call(this,e,a))).handleSubmit=function(){var e=[];n.state.mob.ac<0&&e.push({field:"ac",message:"Armor must be a positive number."}),n.state.mob.ac>1e4&&e.push({field:"ac",message:"Armor cannot go higher than 10,000. This gives the mob a 95% damage reduction. Maybe you should make it stance to make it even stronger?"}),n.state.mob.hp<500&&e.push({field:"hp",message:"You cannot set the hp value to less than 500."}),n.state.mob.hp>25e4&&e.push({field:"hp",message:"You cannot set the hp value to more than 250000. Might we suggest increasing the remort level to make it tougher to kill?"}),0===n.state.mob.name.length&&e.push({field:"name",message:"Name cannot be blank."}),0===n.state.mob.short_description.length&&e.push({field:"short_description",message:"Short Description cannot be blank."}),0===n.state.mob.long_description.length&&e.push({field:"long_description",message:"Long Description cannot be blank."}),0===n.state.mob.description.length&&e.push({field:"description",message:"Description cannot be blank."}),(n.state.mob.alignment>1e3||n.state.mob.alignment<-1e3)&&e.push({field:"alignment",message:"Alignment must be between 1000 and -1000"}),n.state.mob.level<=0&&e.push({field:"level",message:"Mob level must be greater than 0."}),n.state.mob.level>25e4&&e.push({field:"level",message:"Mob level cannot be greater than 250,000."}),n.state.mob.exp_level<=0&&e.push({field:"exp_level",message:"EXP level must be greater than 0."}),n.state.mob.exp_level>25e4&&e.push({field:"exp_level",message:"EXP level cannot be greater than 250,000."}),n.state.mob.hitroll<=0&&e.push({field:"hitroll",message:"Hitroll must be greater than 0."}),n.state.mob.hitroll>7500&&e.push({field:"hitroll",message:"Hitroll cannot be greater than 7,500."}),n.state.mob.damroll<=0&&e.push({field:"damroll",message:"Damroll must be greater than 0."}),n.state.mob.damroll>7500&&e.push({field:"damroll",message:"Damroll cannot be greater than 7,500."}),n.setState({errors:e}),0===e.length&&(0===n.state.mobId?n.saveMob():n.updateMob())},n.config=P,n.state={errors:[],mobId:0,niceName:"Create Mob",mobs:[{vnum:0,name:"first mob areaname",short_description:"my first mob",long_description:"This is my first mob. Ain't it perty?"}],mob:{vnum:0,name:"",short_description:"",long_description:"",description:"",act:0,affected_by:[],alignment:0,level:0,exp_level:0,hitroll:0,damroll:0,ac:0,hp:100,gold:10,sex:0},genders:[{key:"0",text:"Unsullied",value:"0"},{key:"1",text:"Male",value:"1"},{key:"2",text:"Female",value:"2"}],affects:[{key:"0",text:"Invis",value:"2"},{key:"1",text:"Detect Invis",value:"8"},{key:"2",text:"Detect Hidden",value:"32"},{key:"3",text:"Shadow Plane",value:"64"},{key:"4",text:"Sanct",value:"128"},{key:"5",text:"Faerie Fire",value:"256"},{key:"6",text:"Infravision",value:"512"},{key:"7",text:"Prot vs Evil",value:"8192"},{key:"8",text:"Sneak",value:"32768"},{key:"9",text:"Hide",value:"65536"},{key:"10",text:"Flying",value:"524288"},{key:"11",text:"Pass Door",value:"1048576"},{key:"12",text:"Shadow Sight",value:"4194304"}]},n.getMob=n.getMob.bind(Object(A.a)(Object(A.a)(n))),n.getMobs=n.getMobs.bind(Object(A.a)(Object(A.a)(n))),n.saveMob=n.saveMob.bind(Object(A.a)(Object(A.a)(n))),n.updateMob=n.updateMob.bind(Object(A.a)(Object(A.a)(n))),n.handleChange=n.handleChange.bind(Object(A.a)(Object(A.a)(n))),n.handleSubmit=n.handleSubmit.bind(Object(A.a)(Object(A.a)(n))),n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.getMobs(),"undefined"!==typeof this.props.match.params.mobId&&(this.setState({mobId:this.props.match.params.mobId,niceName:"Update Mob"}),this.getMob(this.props.match.params.mobId)),document.title=this.state.niceName}},{key:"componentWillReceiveProps",value:function(){this.getMobs(),"undefined"!==typeof this.props.match.params.mobId&&(this.setState({mobId:this.props.match.params.mobId,niceName:"Update Mob"}),this.getMob(this.props.match.params.mobId)),document.title=this.state.niceName}},{key:"getMobs",value:function(){var e=openDatabase(this.config.dbName,this.config.dbVersion,this.config.dbDescription,this.config.dbSize),t=this,a=[];e.transaction(function(e){e.executeSql("SELECT * FROM mobs WHERE area_id = ? LIMIT 10000",[t.props.areas.activeArea],function(e,n){if(n.rows.length>=1)for(var o=0;o<n.rows.length;o++)a.push({id:n.rows[o].id,vnum:n.rows[o].vnum,name:n.rows[o].name,short_description:n.rows[o].short_description,long_description:n.rows[o].long_description,description:n.rows[o].description,act:n.rows[o].act,affected_by:n.rows[o].affected_by,alignment:n.rows[o].alignment,level:n.rows[o].level,exp_level:n.rows[o].exp_level,hitroll:n.rows[o].hitroll,damroll:n.rows[o].damroll,ac:n.rows[o].ac,hp:n.rows[o].hp,gold:n.rows[o].gold,sex:n.rows[o].sex});else a=[{id:0,name:"first mob areaname",short_description:"my first mob",long_description:"This is my first mob. Ain't it perty?"}];t.setState({mobs:a})})})}},{key:"handleChange",value:function(e){var t=e.target,a=t.name,n=t.value;("level"!==a&&"exp_level"!==a&&"alignment"!==a&&"hitroll"!==a&&"damroll"!==a&&"ac"!==a&&"hp"!==a&&"gold"!==a&&"sex"!==a||W(n))&&(this.setState(function(e){return{mob:Object(N.a)({},e.mob,Object(S.a)({},a,n))}}),this.setState({unsaved:!0}))}},{key:"getMob",value:function(e){var t=this,a={vnum:1,name:"",short_description:"",long_description:"",description:"",act:0,affected_by:[],alignment:0,level:0,exp_level:0,hitroll:0,damroll:0,ac:0,hp:100,gold:10,sex:0};openDatabase(P.dbName,P.dbVersion,P.dbDescription,P.dbSize).transaction(function(n){n.executeSql("SELECT * FROM mobs WHERE area_id = '"+t.props.areas.activeArea+"' AND id = '"+e+"'",[],function(e,n){n.rows.length&&((a=n.rows[0]).affected_by=JSON.parse(a.affected_by),t.setState({mob:a}))},function(e){console.log(e)})})}},{key:"saveMob",value:function(){var e=this;openDatabase(P.dbName,P.dbVersion,P.dbDescription,P.dbSize).transaction(function(t){t.executeSql("INSERT INTO mobs (vnum, name, short_description, long_description, description, act, affected_by, alignment, level, exp_level, hitroll, damroll, ac, hp, gold, sex, area_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[e.state.mob.vnum,e.state.mob.name,e.state.mob.short_description,e.state.mob.long_description,e.state.mob.description,e.state.mob.act,JSON.stringify(e.state.mob.affected_by),e.state.mob.alignment,e.state.mob.level,e.state.mob.exp_level,e.state.mob.hitroll,e.state.mob.damroll,e.state.mob.ac,e.state.mob.hp,e.state.mob.gold,e.state.mob.sex,e.props.areas.activeArea],function(t,a){e.props.history.push("/mobs/"+a.insertId+"/")},function(e){console.log(e)})})}},{key:"updateMob",value:function(){var e=this;openDatabase(P.dbName,P.dbVersion,P.dbDescription,P.dbSize).transaction(function(t){t.executeSql("UPDATE MOBS set name = ?, short_description = ?, long_description = ?, description = ?, act = ?, affected_by = ?,  alignment = ?, level = ?, exp_level = ?, hitroll = ?, damroll = ?, ac = ?, hp = ?, gold = ?, sex = ? WHERE id = ?",[e.state.mob.name,e.state.mob.short_description,e.state.mob.long_description,e.state.mob.description,e.state.mob.act,JSON.stringify(e.state.mob.affected_by),e.state.mob.alignment,e.state.mob.level,e.state.mob.exp_level,e.state.mob.hitroll,e.state.mob.damroll,e.state.mob.ac,e.state.mob.hp,e.state.mob.gold,e.state.mob.sex,e.state.mobId],function(t,a){e.getMobs()},function(e){console.log(e)})})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"wrap fade-in"},s.a.createElement(C.a,{placeholder:!0},s.a.createElement(D.a,{columns:2,stackable:!0,textAlign:"center"},s.a.createElement(M.a,{vertical:!0}),s.a.createElement(D.a.Row,{verticalAlign:"top"},s.a.createElement(D.a.Column,null,s.a.createElement("div",{id:"mobs-list",className:"fade-in"},s.a.createElement(R.a,{divided:!0,relaxed:!0},this.state.mobs.map(function(e){return s.a.createElement(R.a.Item,{key:"mob"+e.id},s.a.createElement(R.a.Content,null,s.a.createElement(R.a.Header,null,s.a.createElement(_.a,{to:"/mobs/"+e.id+"/"},"(",e.id,") ",e.name)),s.a.createElement(R.a.Description,null,e.short_description)))})),s.a.createElement("div",{id:"view-header-section"},s.a.createElement(X.a,{as:_.a,to:"/mobs/",className:"view-create-new"},s.a.createElement(H.a,{name:"plus"}),"Create New")))),s.a.createElement(D.a.Column,null,s.a.createElement("div",{id:"mob-stats",className:"fade-in"},this.state.errors.length>0&&s.a.createElement(L.a,{negative:!0},s.a.createElement(L.a.Header,null,"Please fix the following errors:"),this.state.errors.map(function(e){return s.a.createElement("p",null,e.message)})),s.a.createElement(q.a,{onSubmit:this.handleSubmit},s.a.createElement(q.a.Group,{widths:"equal"},s.a.createElement(q.a.Field,null,s.a.createElement("label",null,"Namelist ",s.a.createElement(F.a,{trigger:s.a.createElement(X.a,{icon:"help circle"}),content:"This is the list of names that your mob can be found under"})),s.a.createElement(V.a,{name:"name",value:this.state.mob.name,placeholder:"name",onChange:this.handleChange})),s.a.createElement(q.a.Input,{fluid:!0,name:"short_description",value:this.state.mob.short_description,label:"Short Desc",placeholder:"Short desc",onChange:this.handleChange})),s.a.createElement(q.a.Input,{fluid:!0,name:"long_description",label:"Long Desc",placeholder:"",value:this.state.mob.long_description,onChange:this.handleChange}),s.a.createElement(q.a.TextArea,{name:"description",label:"Look",placeholder:"The mob looks back at you!",value:this.state.mob.description,onChange:this.handleChange}),s.a.createElement(q.a.Group,{widths:"equal"},s.a.createElement(q.a.Input,{fluid:!0,name:"alignment",label:"Alignment",placeholder:"0",value:this.state.mob.alignment,onChange:this.handleChange}),s.a.createElement(q.a.Input,{fluid:!0,name:"level",label:"Level",placeholder:"0",value:this.state.mob.level,onChange:this.handleChange}),s.a.createElement(q.a.Input,{fluid:!0,name:"exp_level",label:"EXP Level",placeholder:"0",value:this.state.mob.exp_level,onChange:this.handleChange}),s.a.createElement(q.a.Input,{fluid:!0,name:"gold",label:"Gold",placeholder:"0",value:this.state.mob.gold,onChange:this.handleChange}),s.a.createElement(q.a.Select,{fluid:!0,name:"sex",label:"Gender",options:this.state.genders,placeholder:"Gender",onChange:this.handleChange})),s.a.createElement(q.a.Group,{widths:"equal"},s.a.createElement(q.a.Input,{fluid:!0,name:"hp",label:"HP",placeholder:"0",value:this.state.mob.hp,onChange:this.handleChange}),s.a.createElement(q.a.Input,{fluid:!0,name:"hitroll",label:"Hitroll",placeholder:"0",value:this.state.mob.hitroll,onChange:this.handleChange}),s.a.createElement(q.a.Input,{fluid:!0,name:"damroll",label:"Damroll",placeholder:"0",value:this.state.mob.damroll,onChange:this.handleChange}),s.a.createElement(q.a.Input,{fluid:!0,name:"ac",label:"Armor",placeholder:"0",value:this.state.mob.ac,onChange:this.handleChange})),s.a.createElement(q.a.Group,{widths:"equal"},s.a.createElement(q.a.Dropdown,{label:"Affects",placeholder:"Affects",name:"affected_by",fluid:!0,multiple:!0,selection:!0,options:this.state.affects,value:this.state.mob.affected_by,onChange:function(t,a){var n=a.value;return e.setState(function(e){return{mob:Object(N.a)({},e.mob,{affected_by:Object(k.a)(n)})}})}})),s.a.createElement(q.a.Button,{content:this.state.niceName}))))))))}}]),t}(s.a.Component);var G=Object(y.a)(Object(p.b)(function(e){return e})(B)),U=f()();function z(e){return function(t){t(function(e){return{type:"ACTIVE_AREA",areaId:e}}(e)),localStorage.setItem("activeArea",e),U.push("/rooms/")}}var Y=function(e){function t(e,a){var n;return Object(l.a)(this,t),(n=Object(m.a)(this,Object(d.a)(t).call(this,e,a))).handleSubmit=function(){if(""===n.state.area.name&&n.setState({errors:[{field:"name",message:"You must provide an area name."}]}),""===n.state.area.created_by&&n.setState({errors:[{field:"created_by",message:"You need to provide a name so we can credit the right person."}]}),n.state.errors.length>0)return!1;0===n.state.areaId?n.createArea():n.updateArea()},n.setNewActiveArea=function(){return n.props.actions.setActiveArea(n.state.areaId)},n.config=P,n.handleChange=n.handleChange.bind(Object(A.a)(Object(A.a)(n))),n.getAreas=n.getAreas.bind(Object(A.a)(Object(A.a)(n))),n.state={errors:[],niceName:"Create Area",areaId:0,areas:[{name:"My First Area",created_by:"Your Name Here",id:0}],area:{name:"",created_by:"",id:0}},n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"getAreas",value:function(){var e=openDatabase(this.config.dbName,this.config.dbVersion,this.config.dbDescription,this.config.dbSize),t=this,a=[];e.transaction(function(e){e.executeSql("SELECT * FROM areas LIMIT 10000",[],function(e,n){if(n.rows.length>=1)for(var o=0;o<n.rows.length;o++)a.push({id:n.rows[o].id,name:n.rows[o].name,created_by:n.rows[o].created_by});else a=[{id:0,name:"My First Area",created_by:"Your Name Here"}];t.setState({areas:a})})})}},{key:"componentDidMount",value:function(e){this.getAreas(),"undefined"!==typeof this.props.match.params.areaId&&(this.setState({areaId:this.props.match.params.areaId,niceName:"Update Area"}),this.getArea(this.props.match.params.areaId)),document.title=this.state.niceName}},{key:"componentWillReceiveProps",value:function(){this.getAreas(),"undefined"!==typeof this.props.match.params.areaId&&(this.setState({areaId:this.props.match.params.areaId,niceName:"Update Area"}),this.getArea(this.props.match.params.areaId)),document.title=this.state.niceName}},{key:"getArea",value:function(e){var t=this;openDatabase(P.dbName,P.dbVersion,P.dbDescription,P.dbSize).transaction(function(a){a.executeSql("SELECT * FROM areas WHERE id = '"+e+"'",[],function(e,a){a.rows.length&&t.setState({area:{id:a.rows[0].id,name:a.rows[0].name,created_by:a.rows[0].created_by}})},function(e){console.log(e)})})}},{key:"handleChange",value:function(e){var t=e.target,a=t.name,n=t.value;this.setState(function(e){return{area:Object(N.a)({},e.area,Object(S.a)({},a,n))}})}},{key:"createArea",value:function(){var e=this;openDatabase(this.config.dbName,this.config.dbVersion,this.config.dbDescription,this.config.dbSize).transaction(function(t){t.executeSql("INSERT INTO areas (name, created_by) VALUES (?, ?)",[e.state.area.name,e.state.area.created_by],function(t,a){e.props.history.push("/areas/"+a.insertId+"/")},function(e,t){console.log(t)})})}},{key:"updateArea",value:function(){var e=this;openDatabase(this.config.dbName,this.config.dbVersion,this.config.dbDescription,this.config.dbSize).transaction(function(t){t.executeSql("UPDATE areas SET name = ?, created_by = ? WHERE rowid = ?",[e.state.area.name,e.state.area.created_by,e.state.areaId],function(t,a){e.getAreas()},function(e,t){console.log(t)})})}},{key:"render",value:function(){return s.a.createElement("div",{className:"wrap fade-in"},s.a.createElement(C.a,{placeholder:!0},s.a.createElement(D.a,{columns:2,stackable:!0,textAlign:"center"},s.a.createElement(M.a,{vertical:!0}),s.a.createElement(D.a.Row,{verticalAlign:"top"},s.a.createElement(D.a.Column,null,s.a.createElement("div",{id:"areas-list",className:"fade-in"},s.a.createElement(R.a,{divided:!0,relaxed:!0},this.state.areas.map(function(e){return s.a.createElement(R.a.Item,{key:"area-"+e.id},s.a.createElement(R.a.Content,null,s.a.createElement(_.a,{to:"/areas/"+e.id+"/"},s.a.createElement(R.a.Header,null,"(",e.id,") ",e.name)),s.a.createElement(R.a.Description,null,e.created_by)))})),s.a.createElement("div",{id:"view-header-section"},s.a.createElement(X.a,{as:_.a,to:"/areas/",className:"view-create-new"},s.a.createElement(H.a,{name:"plus"}),"Create New")))),s.a.createElement(D.a.Column,null,s.a.createElement("div",{id:"mob-stats",className:"fade-in"},this.state.errors.length>0&&s.a.createElement(L.a,{negative:!0},s.a.createElement(L.a.Header,null,"Please fix the following errors:"),this.state.errors.map(function(e){return s.a.createElement("p",null,e.message)})),s.a.createElement(q.a,null,s.a.createElement(q.a.Group,{widths:"equal"},s.a.createElement(q.a.Input,{fluid:!0,name:"name",label:"Area Name",placeholder:"Area Name Here",value:this.state.area.name,onChange:this.handleChange}),s.a.createElement(q.a.Input,{fluid:!0,name:"created_by",label:"Created By",placeholder:"Your Name Here",value:this.state.area.created_by,onChange:this.handleChange})),s.a.createElement(q.a.Group,{widths:"equal"},s.a.createElement(q.a.Button,{onClick:this.handleSubmit,color:"black",content:this.state.niceName}),0!==this.state.areaId&&s.a.createElement(q.a.Button,{color:"green",onClick:this.setNewActiveArea},"Open ",this.state.area.name," for Building")))))))))}}]),t}(s.a.Component);var J=Object(y.a)(Object(p.b)(function(e){return e},function(e){return{actions:Object(E.b)(n,e)}})(Y)),K=a(166),Q=a(361),$=function(e){function t(e,a){var n;Object(l.a)(this,t),(n=Object(m.a)(this,Object(d.a)(t).call(this,e,a))).handleSubmit=function(){console.log(n.state.object);var e=[];n.setState({errors:e}),0===e.length&&(0===n.state.objectId?n.saveObject():n.updateObject())},n.config=P;var o=localStorage.getItem("selectedArea");return null===o&&(o=0),n.state={selectedArea:o,errors:[],objectId:0,niceName:"Create Object",objects:[{id:0,name:"first object areaname",short_description:"my first object",description:"This is my first object. Ain't it perty?"}],object:{id:0,name:"",short_description:"",description:"",item_type:0,extra_flags:[],wear_flags:[],value0:0,value1:0,value2:0,value3:0,weight:0,cost:0,affect_data:[],extra_descr_data:[],chpoweron:"",chpoweroff:"",chpoweruse:"",victpoweron:"",victpoweroff:"",victpoweruse:"",spectype:0,specpower:0},extra_flags:[{key:"1",text:"Glow",value:"1"},{key:"2",text:"Hum",value:"2"},{key:"4",text:"Throw",value:"4"},{key:"8",text:"Keep",value:"8"},{key:"16",text:"Vanish",value:"16"},{key:"32",text:"Invis",value:"32"},{key:"64",text:"Magic",value:"64"},{key:"128",text:"No Drop",value:"128"},{key:"256",text:"Bless",value:"256"},{key:"512",text:"Anti-Good",value:"512"},{key:"1024",text:"Anti-Evil",value:"1024"},{key:"2048",text:"Anti-Neutral",value:"2048"},{key:"4096",text:"No Remove",value:"4096"},{key:"8192",text:"Inventory",value:"8192"},{key:"16384",text:"Loyal",value:"16384"},{key:"32768",text:"Shadowplane",value:"32768"},{key:"65536",text:"Silver",value:"65536"},{key:"131072",text:"No Quest Card",value:"131072"},{key:"262144",text:"Quest Item",value:"262144"},{key:"524288",text:"Clan Iotem",value:"524288"},{key:"1048576",text:"Auto Claim",value:"1048576"},{key:"2097152",text:"Silent Vanish",value:"2097152"}],wear_flags:[{key:1,text:"Take",value:1},{key:2,text:"Finger",value:2},{key:4,text:"Neck",value:4},{key:8,text:"Body",value:8},{key:16,text:"Head",value:16},{key:32,text:"Legs",value:32},{key:64,text:"Feet",value:64},{key:128,text:"Hands",value:128},{key:256,text:"Arms",value:256},{key:512,text:"Shield",value:512},{key:1024,text:"About",value:1024},{key:2048,text:"Waist",value:2048},{key:4096,text:"Wrist",value:4096},{key:8192,text:"Wield",value:8192},{key:16384,text:"Hold",value:16384},{key:32768,text:"Wear Face",value:32768}],specials:[{key:1,text:"Activate",value:"1"},{key:2,text:"Twist",value:"2"},{key:4,text:"Press",value:"4"},{key:8,text:"Pull",value:"8"},{key:16,text:"Target",value:"16"},{key:32,text:"Spell",value:"32"},{key:64,text:"Transporter",value:"64"},{key:128,text:"Teleporter",value:"128"},{key:256,text:"Delay 1",value:"256"},{key:512,text:"Delay 2",value:"512"},{key:1024,text:"Object",value:"1024"},{key:2048,text:"Mobile",value:"2048"},{key:4096,text:"Action",value:"4096"},{key:8192,text:"Morph",value:"8192"}]},n.getObject=n.getObject.bind(Object(A.a)(Object(A.a)(n))),n.getObjects=n.getObjects.bind(Object(A.a)(Object(A.a)(n))),n.saveObject=n.saveObject.bind(Object(A.a)(Object(A.a)(n))),n.updateObject=n.updateObject.bind(Object(A.a)(Object(A.a)(n))),n.handleChange=n.handleChange.bind(Object(A.a)(Object(A.a)(n))),n.handleSubmit=n.handleSubmit.bind(Object(A.a)(Object(A.a)(n))),n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.getObjects(),"undefined"!==typeof this.props.match.params.objectId&&(this.setState({objectId:this.props.match.params.objectId,niceName:"Update Object"}),this.getObject(this.props.match.params.objectId)),document.title=this.state.niceName}},{key:"componentWillReceiveProps",value:function(){this.getObjects(),"undefined"!==typeof this.props.match.params.objectId&&(this.setState({objectId:this.props.match.params.objectId,niceName:"Update Object"}),this.getObject(this.props.match.params.objectId)),document.title=this.state.niceName}},{key:"getObjects",value:function(){var e=openDatabase(this.config.dbName,this.config.dbVersion,this.config.dbDescription,this.config.dbSize),t=this,a=[];e.transaction(function(e){e.executeSql("SELECT * FROM objects WHERE area_id = ? LIMIT 10000",[t.props.areas.activeArea],function(e,n){if(n.rows.length>=1)for(var o=0;o<n.rows.length;o++)a.push({id:n.rows[o].id,name:n.rows[o].name,short_description:n.rows[o].short_description,description:n.rows[o].description,item_type:n.rows[o].item_type,extra_flags:n.rows[o].extra_flags,wear_flags:n.rows[o].wear_flags,value0:n.rows[o].value0,value1:n.rows[o].value1,value2:n.rows[o].value2,value3:n.rows[o].value3,weight:n.rows[o].weight,cost:n.rows[o].cost,affect_data:n.rows[o].affect_data,extra_descr_data:n.rows[o].extra_descr_data,chpoweron:n.rows[o].chpoweron,chpoweroff:n.rows[o].chpoweroff,chpoweruse:n.rows[o].chpoweruse,victpoweron:n.rows[o].victpoweron,victpoweroff:n.rows[o].victpoweroff,victpoweruse:n.rows[o].victpoweruse,spectype:n.rows[o].spectype,specpower:n.rows[o].specpower});else a=[{id:0,name:"first mob areaname",short_description:"my first mob",long_description:"This is my first mob. Ain't it perty?"}];t.setState({objects:a})})})}},{key:"handleChange",value:function(e){var t=e.target,a=t.name,n=t.value;this.setState(function(e){return{object:Object(N.a)({},e.object,Object(S.a)({},a,n))}}),this.setState({unsaved:!0})}},{key:"getObject",value:function(e){console.log(e);var t=this,a={vnum:1,name:"",short_description:"",description:"",act:0,affected_by:0,alignment:0,level:0,exp_level:0,hitroll:0,damroll:0,ac:0,hp:100,gold:10,sex:0};openDatabase(P.dbName,P.dbVersion,P.dbDescription,P.dbSize).transaction(function(n){n.executeSql("SELECT * FROM objects WHERE area_id = '"+t.props.areas.activeArea+"' AND id = '"+e+"'",[],function(e,n){n.rows.length&&(a=n.rows[0],t.setState({object:a}))},function(e){console.log(e)})}),console.log(a)}},{key:"saveObject",value:function(){var e=this;console.log("Trying to save"),openDatabase(P.dbName,P.dbVersion,P.dbDescription,P.dbSize).transaction(function(t){t.executeSql("INSERT INTO objects (name, short_description, description, item_type, extra_flags, wear_flags, value0, value1, value2, value3, weight, cost, affect_data, extra_descr_data, chpoweron, chpoweroff, chpoweruse, victpoweron, victpoweroff, victpoweruse, spectype, specpower, area_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[e.state.object.name,e.state.object.short_description,e.state.object.description,e.state.object.item_type,e.state.object.extra_flags,e.state.object.wear_flags,e.state.object.value0,e.state.object.value1,e.state.object.value2,e.state.object.value3,e.state.object.weight,e.state.object.cost,e.state.object.affect_data,e.state.object.extra_descr_data,e.state.object.chpoweron,e.state.object.chpoweroff,e.state.object.chpoweruse,e.state.object.victpoweron,e.state.object.victpoweroff,e.state.object.victpoweruse,e.state.object.spectype,e.state.object.specpower,e.props.areas.activeArea],function(t,a){e.getObjects(),console.log(t),console.log(a),e.props.history.push("/objects/"+a.insertId+"/")},function(e,t){console.log(t.message)})})}},{key:"updateObject",value:function(){var e=this;console.log("Trying to save"),openDatabase(P.dbName,P.dbVersion,P.dbDescription,P.dbSize).transaction(function(t){t.executeSql("UPDATE objects SET name = ?, short_description = ?, description = ?, item_type = ?, extra_flags = ?, wear_flags = ?, value0 = ?, value1 = ?, value2 = ?, value3 = ?, weight = ?, cost = ?, affect_data = ?, extra_descr_data = ?, chpoweron = ?, chpoweroff = ?, chpoweruse = ?, victpoweron = ?, victpoweroff = ?, victpoweruse = ?, spectype = ?, specpower = ? WHERE id = ?",[e.state.object.name,e.state.object.short_description,e.state.object.description,e.state.object.item_type,e.state.object.extra_flags,e.state.object.wear_flags,e.state.object.value0,e.state.object.value1,e.state.object.value2,e.state.object.value3,e.state.object.weight,e.state.object.cost,e.state.object.affect_data,e.state.object.extra_descr_data,e.state.object.chpoweron,e.state.object.chpoweroff,e.state.object.chpoweruse,e.state.object.victpoweron,e.state.object.victpoweroff,e.state.object.victpoweruse,e.state.object.spectype,e.state.object.specpower,e.state.objectId],function(t,a){e.getObjects()},function(e,t){console.log(t.message)})})}},{key:"render",value:function(){return console.log(this.state),s.a.createElement("div",{className:"wrap fade-in"},s.a.createElement(C.a,{placeholder:!0},s.a.createElement(D.a,{columns:2,stackable:!0,textAlign:"center"},s.a.createElement(M.a,{vertical:!0}),s.a.createElement(D.a.Row,{verticalAlign:"top"},s.a.createElement(D.a.Column,null,s.a.createElement("div",{id:"objects-list",className:"fade-in"},this.state.objects.map(function(e){return s.a.createElement(R.a,{key:e.id,divided:!0,relaxed:!0},s.a.createElement(R.a.Item,null,s.a.createElement(R.a.Content,null,s.a.createElement(R.a.Header,null,s.a.createElement(_.a,{to:"/objects/"+e.id+"/"},"(",e.id,") ",e.name)),s.a.createElement(R.a.Description,null,e.short_description))))}),s.a.createElement("div",{id:"view-header-section"},s.a.createElement(X.a,{as:_.a,to:"/objects/",className:"view-create-new"},s.a.createElement(H.a,{name:"plus"}),"Create New")))),s.a.createElement(D.a.Column,null,s.a.createElement("div",{id:"object-stats",className:"fade-in"},this.state.errors.length>0&&s.a.createElement(L.a,{negative:!0},s.a.createElement(L.a.Header,null,"Please fix the following errors:"),this.state.errors.map(function(e){return s.a.createElement("p",null,e.message)})),s.a.createElement(q.a,{onSubmit:this.handleSubmit},s.a.createElement(q.a.Group,{widths:"equal"},s.a.createElement(q.a.Input,{fluid:!0,name:"name",label:"Name",value:this.state.object.name,placeholder:"name",onChange:this.handleChange}),s.a.createElement(q.a.Input,{fluid:!0,name:"short_description",value:this.state.object.short_description,label:"Short Desc",placeholder:"Short desc",onChange:this.handleChange})),s.a.createElement(q.a.Input,{fluid:!0,name:"description",label:"Long Desc",placeholder:"Long Description",value:this.state.object.description,onChange:this.handleChange}),s.a.createElement(q.a.Group,null,s.a.createElement(K.a,null,"Extra Flags"),s.a.createElement(Q.a,{label:"Extra Flags",name:"extra_flags",fluid:!0,multiple:!0,selection:!0,options:this.state.extra_flags})),s.a.createElement(q.a.Group,null,s.a.createElement(K.a,null,"Wear Flags"),s.a.createElement(Q.a,{name:"wear_flags",fluid:!0,multiple:!0,selection:!0,options:this.state.wear_flags})),s.a.createElement(q.a.Group,null,s.a.createElement(K.a,null,"Specials"),s.a.createElement(Q.a,{name:"specials",fluid:!0,multiple:!0,selection:!0,options:this.state.specials})),s.a.createElement(q.a.Button,{content:this.state.niceName}))))))))}}]),t}(s.a.Component);var Z=Object(y.a)(Object(p.b)(function(e){return e},function(e){return{}})($)),ee=a(369),te=function(e){function t(){return Object(l.a)(this,t),Object(m.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return s.a.createElement(C.a,{id:"dashboard",placeholder:!0},s.a.createElement(ee.a,{textAlign:"center",as:"h1"},"Online Creation Tool for The Death of Caine MUD"),s.a.createElement("p",null,'To begin, click on Areas. This will allow you to create your first area. Once you have created your area, click on the green "Open AREANAME for Building" button. This will allow you start adding in Rooms, Objects, and Mobs.'))}}]),t}(o.Component);var ae=Object(y.a)(Object(p.b)(function(e){return e},function(e){return{}})(te)),ne=new(function(){function e(){Object(l.a)(this,e),this.config=P}return Object(c.a)(e,[{key:"createDatabases",value:function(){openDatabase(this.config.dbName,this.config.dbVersion,this.config.dbDescription,this.config.dbSize).transaction(function(e){e.executeSql("CREATE TABLE IF NOT EXISTS areas (id INTEGER PRIMARY KEY, name TEXT, created_by TEXT)"),e.executeSql("CREATE TABLE IF NOT EXISTS mobs (id INTEGER PRIMARY KEY, vnum INT, name TEXT, short_description TEXT, long_description TEXT, description TEXT, act TEXT, affected_by TEXT, alignment TEXT, level INT,  exp_level INT, hitroll INT, damroll INT, ac INT, hp INT, gold INT, sex INT, area_id INT)"),e.executeSql("CREATE TABLE IF NOT EXISTS objects (id INTEGER PRIMARY KEY, vnum INT, name TEXT, short_description TEXT, description TEXT, act TEXT, item_type INT, extra_flags TEXT, wear_flags TEXT, value0 INT, value1 INT, value2 INT, value3 INT, weight INT, cost INT, affect_data TEXT, extra_descr_data TEXT, chpoweron TEXT, chpoweroff TEXT, chpoweruse TEXT, victpoweron TEXT, victpoweroff TEXT, victpoweruse TEXT, spectype INT, specpower INT, affected_by TEXT, area_id INT);")}),localStorage.setItem("database","1.1")}}]),e}()),oe=f()(),se=function(e){function t(){return Object(l.a)(this,t),Object(m.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){"1.1"!==localStorage.getItem("dbVersion")&&ne.createDatabases()}},{key:"render",value:function(){return s.a.createElement("div",{className:"marcopromo-app-container"},s.a.createElement(b.a,{history:oe},s.a.createElement("div",{id:"",className:"content"},s.a.createElement(I,null),s.a.createElement("div",{id:"content_bin"},s.a.createElement(h.a,{exact:!0,path:"/",niceName:"Welcome",component:ae}),s.a.createElement(h.a,{exact:!0,path:"/areas/",niceName:"Areas",component:J}),s.a.createElement(h.a,{exact:!0,path:"/areas/:areaId/",niceName:"Areas",component:J}),s.a.createElement(h.a,{exact:!0,path:"/mobs/",niceName:"Mobs",component:G}),s.a.createElement(h.a,{exact:!0,path:"/mobs/:mobId/",niceName:"Edit Mob",component:G}),s.a.createElement(h.a,{exact:!0,path:"/objects/",nameName:"Create Object",component:Z}),s.a.createElement(h.a,{exact:!0,path:"/objects/:objectId/",nameName:"Update Object",component:Z})))))}}]),t}(o.Component);var re=Object(p.b)(function(e){return e},function(e){return{actions:Object(E.b)(g,e)}})(se),ie=a(121),le=0;null!==localStorage.getItem("activeArea")&&(le=localStorage.getItem("activeArea"));var ce={areas:{activeArea:le}};var me=Object(E.c)({areas:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ce,t=arguments.length>1?arguments[1]:void 0,a=Object.assign({},e);switch(t.type){case"areas":return a.areas=t.areas,console.log(a),a;case"ACTIVE_AREA":return a.activeArea=t.areaId,a;default:return e}}});var de,ue=(de=ce,Object(E.e)(me,de,Object(E.d)(Object(E.a)(ie.a))));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var be=ue;i.a.render(s.a.createElement(p.a,{store:be},s.a.createElement(re,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[199,2,1]]]);
//# sourceMappingURL=main.840632b2.chunk.js.map