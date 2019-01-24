const config = {
	database: {
		version: "1.0",
		name: "tdoc_olc",
		size: 2*1024*1024,
		description: "Local Storage database for the Online Area Builder for The Death of Caine mud.",
	},
	object: {
		extra_flags : [
			{key: 1, text: "Glow", value: 1 },
			{key: 2, text: "Hum", value: 2 },
			{key: 3, text: "Throw", value: 4 },
			{key: 4, text: "Keep", value: 8 },
			{key: 5, text: "Vanish", value: 16 },
			{key: 6, text: "Invis", value: 32 },
			{key: 7, text: "Magic", value: 64 },
			{key: 8, text: "No Drop", value: 128 },
			{key: 9, text: "Bless", value: 256 },
			{key: 10, text: "Anti-Good", value: 512 },
			{key: 11, text: "Anti-Evil", value: 1024 },
			{key: 12, text: "Anti-Neutral", value: 2048 },
			{key: 13, text: "No Remove", value: 4096 },
			{key: 14, text: "Inventory", value: 8192 },
			{key: 15, text: "Loyal", value: 16384 },
			{key: 16, text: "Shadowplane", value: 32768 },
			{key: 17, text: "Silver", value: 65536 },
			{key: 18, text: "No Quest Card", value: 131072 },
			{key: 19, text: "Quest Item", value : 262144 },
			{key: 20, text: "Clan Iotem", value : 524288 },
			{key: 21, text: "Auto Claim", value : 1048576 },
			{key: 22, text: "Silent Vanish", value : 2097152 },
		],
		wear_flags: [
			{ key: 1, text : "Take", value : 1 },
			{ key: 2, text : "Finger", value : 2 },
			{ key: 3, text : "Neck", value : 4 },
			{ key: 4, text : "Body", value : 8 },
			{ key: 5, text : "Head", value : 16 },
			{ key: 6, text : "Legs", value : 32 },
			{ key: 7, text : "Feet", value : 64 },
			{ key: 8, text: "Hands", value : 128 },
			{ key: 9, text : "Arms", value : 256 },
			{ key: 10, text : "Shield", value : 512 },
			{ key: 11, text : "About", value : 1024 },
			{ key: 12, text : "Waist", value : 2048 },
			{ key: 13, text : "Wrist", value : 4096 },
			{ key: 14, text : "Wield", value : 8192 },
			{ key: 15, text : "Hold", value : 16384 },
			{ key: 16, text : "Wear Face", value : 32768 },
		],
		specials: [
			{ key : 1, text : "Activate", value : 1 },
			{ key : 2, text : "Twist", value : 2 },
			{ key : 3, text : "Press", value : 4 },
			{ key : 4, text : "Pull", value : 8 },
			{ key : 5, text : "Target", value : 16 },
			{ key : 6, text : "Spell", value : 32 },
			{ key : 7, text : "Transporter", value : 64 },
			{ key : 8, text : "Teleporter", value : 128 },
			{ key : 9, text : "Delay 1", value : 256 },
			{ key : 10, text : "Delay 2", value : 512 },
			{ key : 11, text : "Object", value : 1024 }, 
			{ key : 12, text : "Mobile", value : 2048 },
			{ key : 13, text : "Action", value : 4096 },
			{ key : 14, text : "Morph", value : 8192 },
		],
		affects: [
			{ text: "STR", value: 1, key: 1 },
			{ text: "DEX", value: 2, key: 2 },
			{ text: "INT", value: 3, key: 3 },
			{ text: "WIS", value: 4, key: 4 },
			{ text: "CON", value: 5, key: 5 },
			{ text: "Sex", value: 6, key: 6 },
			{ text: "Mana", value: 12, key: 12 },
			{ text: "Hp", value: 13, key: 13 },
			{ text: "Move", value: 14, key: 14 },
			{ text: "Gold", value: 15, key: 15 },
			{ text: "EXP", value: 16, key: 16 },
			{ text: "Armor", value: 17, key: 17 },
			{ text: "Hitroll", value: 18, key: 18 },
			{ text: "Damroll", value: 19, key: 19 },
			{ text: "SAVING_PARA", value: 20, key: 20 },
			{ text: "SAVING_ROD", value: 21, key: 21 },
			{ text: "SAVING_PETRI", value: 22, key: 22 },
			{ text: "SAVING_BREATH", value: 23, key: 23 },
			{ text: "SAVING_SPELL", value: 24, key: 24 }
		], 
		item_types: [
			{ text: "Light", value: 1, key: 1 },
			{ text: "Scroll", value: 2, key: 2 },
			{ text: "Wand", value: 3, key: 3 },
			{ text: "Staff", value: 4, key: 4 },
			{ text: "Weapon", value: 5, key: 5 },
			{ text: "Treasure", value: 8, key: 6 },
			{ text: "Armor", value: 9, key: 7 },
			{ text: "Potion", value: 10, key: 8 },
			{ text: "Furniture", value: 12, key: 9 },
			{ text: "Trash", value: 13, key: 10 },
			{ text: "Container", value: 15, key: 11 },
			{ text: "Drink Container", value: 17, key: 12 },
			{ text: "Key", value: 18, key: 13 },
			{ text: "Food", value: 19, key: 14 },
			{ text: "Gold", value: 20, key: 15 },
			{ text: "Boat", value: 22, key: 16 },
			{ text: "NPC Corpse", value: 23, key: 17 },
			{ text: "Fountain", value: 25, key: 19 },
			{ text: "Pill", value: 26, key: 20 },
			{ text: "Portal", value: 27, key: 21 }
		],
		spells: [ 
			{key: 1, value: 1, text: "acid blast" }, 
			{key: 2, value: 2, text: "armor" }, 
			{key: 3, value: 3, text: "bless" }, 
			{key: 4, value: 4, text: "blindness" }, 
			{key: 5, value: 5, text: "burning hands" }, 
			{key: 6, value: 6, text: "call lightning" }, 
			{key: 7, value: 7, text: "cause critical" }, 
			{key: 8, value: 8, text: "cause light" }, 
			{key: 9, value: 9, text: "cause serious" }, 
			{key: 10, value: 10, text: "change sex" }, 
			{key: 11, value: 11, text: "charm person" }, 
			{key: 12, value: 12, text: "chill touch" }, 
			{key: 13, value: 13, text: "colour spray" }, 
			{key: 14, value: 14, text: "continual light" }, 
			{key: 15, value: 15, text: "control weather" }, 
			{key: 16, value: 16, text: "create food" }, 
			{key: 17, value: 17, text: "create spring" }, 
			{key: 18, value: 18, text: "create water" }, 
			{key: 19, value: 19, text: "cure blindness" }, 
			{key: 20, value: 20, text: "cure critical" }, 
			{key: 21, value: 21, text: "cure light" }, 
			{key: 22, value: 22, text: "cure poison" }, 
			{key: 23, value: 23, text: "cure serious" }, 
			{key: 24, value: 24, text: "curse" }, 
			{key: 25, value: 25, text: "detect evil" }, 
			{key: 26, value: 26, text: "detect hidden" }, 
			{key: 27, value: 27, text: "detect invis" }, 
			{key: 28, value: 28, text: "detect magic" }, 
			{key: 29, value: 29, text: "detect poison" }, 
			{key: 30, value: 30, text: "dispel evil" }, 
			{key: 31, value: 31, text: "dispel magic" }, 
			{key: 32, value: 32, text: "earthquake" }, 
			{key: 33, value: 33, text: "enchant weapon" }, 
			{key: 34, value: 34, text: "energy drain" }, 
			{key: 35, value: 35, text: "faerie fire" }, 
			{key: 36, value: 36, text: "faerie fog" }, 
			{key: 37, value: 37, text: "fireball" }, 
			{key: 38, value: 38, text: "flamestrike" }, 
			{key: 39, value: 39, text: "fly" }, 
			{key: 40, value: 40, text: "gate" }, 
			{key: 41, value: 41, text: "giant strength" }, 
			{key: 42, value: 42, text: "harm" }, 
			{key: 43, value: 43, text: "heal" }, 
			{key: 44, value: 44, text: "identify" }, 
			{key: 45, value: 45, text: "infravision" }, 
			{key: 46, value: 46, text: "invis" }, 
			{key: 47, value: 47, text: "know alignment" }, 
			{key: 48, value: 48, text: "lightning bolt" }, 
			{key: 49, value: 49, text: "locate object" }, 
			{key: 50, value: 50, text: "magic missile" }, 
			{key: 51, value: 51, text: "mass invis" }, 
			{key: 52, value: 52, text: "pass door" }, 
			{key: 53, value: 53, text: "poison" }, 
			{key: 54, value: 54, text: "protection" }, 
			{key: 55, value: 55, text: "refresh" }, 
			{key: 56, value: 56, text: "remove curse" }, 
			{key: 57, value: 57, text: "sanctuary" }, 
			{key: 58, value: 58, text: "shield" }, 
			{key: 59, value: 59, text: "shocking grasp" }, 
			{key: 60, value: 60, text: "sleep" }, 
			{key: 61, value: 61, text: "stone skin" }, 
			{key: 62, value: 62, text: "summon" }, 
			{key: 63, value: 63, text: "teleport" }, 
			{key: 64, value: 64, text: "ventriloquate" }, 
			{key: 65, value: 65, text: "weaken" }, 
			{key: 66, value: 66, text: "word of recall" }, 
			{key: 67, value: 67, text: "acid breath" }, 
			{key: 68, value: 68, text: "fire breath" }, 
			{key: 69, value: 69, text: "frost breath" }, 
			{key: 70, value: 70, text: "gas breath" }, 
			{key: 71, value: 71, text: "lightning breath" }, 
			{key: 72, value: 72, text: "backstab" }, 
			{key: 73, value: 73, text: "disarm" }, 
			{key: 74, value: 74, text: "hide" }, 
			{key: 75, value: 75, text: "hurl" }, 
			{key: 76, value: 76, text: "kick" }, 
			{key: 77, value: 77, text: "peek" }, 
			{key: 78, value: 78, text: "pick lock" }, 
			{key: 79, value: 79, text: "rescue" }, 
			{key: 80, value: 80, text: "sneak" }, 
			{key: 81, value: 81, text: "steal" }, 
			{key: 82, value: 82, text: "general purpose" }, 
			{key: 83, value: 83, text: "high explosive" }, 
			{key: 84, value: 84, text: "guardian" }, 
			{key: 85, value: 85, text: "soulblade" }, 
			{key: 86, value: 86, text: "mana" }, 
			{key: 87, value: 87, text: "frenzy" }, 
			{key: 88, value: 88, text: "darkblessing" }, 
			{key: 89, value: 89, text: "portal" }, 
			{key: 90, value: 90, text: "energyflux" }, 
			{key: 91, value: 91, text: "voodoo" }, 
			{key: 92, value: 92, text: "transport" }, 
			{key: 93, value: 93, text: "regenerate" }, 
			{key: 94, value: 94, text: "clot" }, 
			{key: 95, value: 95, text: "mend" }, 
			{key: 96, value: 96, text: "punch" }, 
			{key: 97, value: 97, text: "quest" }, 
			{key: 98, value: 98, text: "minor creation" }, 
			{key: 99, value: 99, text: "brew" }, 
			{key: 100, value: 100, text: "scribe" }, 
			{key: 101, value: 101, text: "carve" }, 
			{key: 102, value: 102, text: "engrave" }, 
			{key: 103, value: 103, text: "bake" }, 
			{key: 104, value: 104, text: "mount" }, 
			{key: 105, value: 105, text: "berserk" }, 
			{key: 106, value: 106, text: "fastdraw" }, 
			{key: 107, value: 107, text: "hunt" }, 
			{key: 108, value: 108, text: "scan" }, 
			{key: 109, value: 109, text: "repair" }, 
			{key: 110, value: 110, text: "spellproof" }, 
			{key: 111, value: 111, text: "clone" }, 
			{key: 112, value: 112, text: "reveal" }
		],
		weapon_spells: [
			/*
			
			*/
		],
		weapon_types: [
			{ key: 0, value: 0, text: "hit" },
			{ key: 1, value: 1, text: "slice" },
			{ key: 2, value: 2, text: "stab" },
			{ key: 3, value: 3, text: "slash" },
			{ key: 4, value: 4, text: "whip" },
			{ key: 5, value: 5, text: "claw" },
			{ key: 6, value: 6, text: "blast" },
			{ key: 7, value: 7, text: "pound" },
			{ key: 8, value: 8, text: "crush" },
			{ key: 9, value: 9, text: "grep" },
			{ key: 10, value: 10, text: "bite" },
			{ key: 11, value: 12, text: "pierce" },
			{ key: 12, value: 13, text: "suck" }
		],
		armor_spells: [],
		liquids: [
			{ text: "water", value: 0, key: 1 },
			{ text: "beer", value: 1, key: 2 },
			{ text: "wine", value: 2, key: 3 },
			{ text: "ale", value: 3, key: 4 },
			{ text: "darkale", value: 4, key: 5 },
			{ text: "whisky", value: 5, key: 6 },
			{ text: "firebreather", value: 7, key: 7 },
			{ text: "specialty", value: 8, key: 8 },
			{ text: "slime", value: 9, key: 9 },
			{ text: "milk", value: 10, key: 10 },
			{ text: "tea", value: 11, key: 11 },
			{ text: "coffee", value: 12, key: 12 },
			{ text: "blood", value: 13, key: 13 },
			{ text: "saltwater", value: 14, key: 14 },
		],
	},
	rooms: {
		flags: [
			{ text: "Dark", value: 1, key: 0 },
			{ text: "Sacred", value: 2, key: 1 },
			{ text: "No Mob", value: 4, key: 2 },
			{ text: "Indoors", value: 8, key: 3 },
			{ text: "Quiet", value: 16, key: 4 },
			{ text: "No Shadowplane", value: 32, key: 5 },
			{ text: "No Spell", value: 64, key: 6 },
			{ text: "No Claim Or Call", value: 128, key: 7 },
			{ text: "Bank", value: 256, key: 8 },
			{ text: "Private", value: 512, key: 9 },
			{ text: "Safe", value: 1024, key: 10 },
			{ text: "Solitary", value: 2048, key: 11 },
			{ text: "No Recall", value: 8192, key: 12 },
			{ text: "Cone of Silence", value: 16384, key: 13 },
			{ text: "No Teleport", value: 32768, key: 14 },
			{ text: "No Mist", value: 65536, key: 15 },
			{ text: "No Transport", value: 131072, key: 16 },
			{ text: "No Escape", value: 262144, key: 17 },
			{ text: "No Home", value: 524288, key: 18 },
			{ text: "No Summon", value: 1048576, key: 19 }
		],
		sectors: [
			{ text: "Inside", value: 0, key: 0 },
			{ text: "City", value: 1, key: 1 },
			{ text: "Field", value: 2, key: 2 },
			{ text: "Forest", value: 3, key: 3 },
			{ text: "Hills", value: 4, key: 4 },
			{ text: "Mountain", value: 5, key: 5 },
			{ text: "Water (Swim)", value: 6, key: 6 },
			{ text: "Water (Noswim)", value: 7, key: 7 },
			{ text: "Air", value: 9, key: 9 },
			{ text: "Desert", value: 10, key: 10 }
		],
		door_flags: [
			{ text: "Door", value: "", key: 0 },
			{ text: "Pick Proof", value: "", key: 1 },
			{ text: "Bash Proof", value: "", key: 2 },
			{ text: "No Pass Door", value: "", key: 3 },
		],
		exit_info_flags: [
			{ text: "Door", value: 1, key: 0 },
			{ text: "Closed", value: 2, key: 1 },
			{ text: "Locked", value: 4, key: 2 },
			{ text: "Bashed", value: 8, key: 3 },
			{ text: "Bash-Proof", value: 16, key: 4 },
			{ text: "Pick-Proof", value: 32, key: 5 },
			{ text: "No Pass Door", value: 64, key: 6 },
		],
	},
	mobs: {
	    genders: [
                { key: '0', text: 'Unsullied', value: '0' },
                { key: '1', text: 'Male', value: '1' },
                { key: '2', text: 'Female', value: '2' },
	    ],
	    affects: [
            { key: "0", text: "Invis", value: "2" },
            { key: "1", text: "Detect Invis", value: "8" },
            { key: "2", text: "Detect Hidden", value: "32" },
            { key: "3", text: "Shadow Plane", value: "64" },
            { key: "4", text: "Sanct", value: "128" },
            { key: "5", text: "Faerie Fire", value: "256" },
            { key: "6", text: "Infravision", value: "512" },
            { key: "7", text: "Prot vs Evil", value: "8192" },
            { key: "8", text: "Sneak", value: "32768" },
            { key: "9", text: "Hide", value: "65536" },
            { key: "10", text: "Flying", value: "524288" },
            { key: "11", text: "Pass Door", value: "1048576" },
            { key: "12", text: "Shadow Sight", value: "4194304" },
	    ],
	}
}

export default config;
