const result = async (fn) => {
	try {
		return { isSuccess: true, result: await fn() };
	} catch (error) {
		return { isSuccess: false, error };
	}
}

// try to add the role using the ID
// return true on success, false otherwise
const addRole = async (state, req, res, role) => {
	console.log("Adding " + role + " role to user " + req.body.user);
	const guild = await result(() => state.client.guilds.fetch(state.DISCORD_GUILD_ID));
	if (!guild.isSuccess) {
		return false;
	}
	const user = await result(() => guild.result.members.fetch(req.body.user));
	if (!user.isSuccess) {
		return false;
	}
	user.result.roles.add(role);
	return true;
};

// try to remove the role using the ID
// return true on success, false otherwise
const removeRole = async (state, req, res, role) => {
	console.log("Removing " + role + " role from user " + req.body.user)
	const guild = await result(() => state.client.guilds.fetch(state.DISCORD_GUILD_ID));
	if (!guild.isSuccess) {
		return false;
	}
	const user = await result(() => guild.result.members.fetch(req.body.user));
	if (!user.isSuccess) {
		return false;
	}
	user.result.roles.remove(role);
	return true;
};


module.exports = { addRole, removeRole };
