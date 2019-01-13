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
	}
}

export default config;



/*
defensive spells
Infravision
See Invis
Fly
Blind
Invis
Passdoor
Protection
Sanctuary
Sneak
Shock Shield
Fire Shield
Ice Shield
Acid Shield


*/