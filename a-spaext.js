	function f(txt) {
		let imp = this;
		if (txt.startsWith("<!DOCTYPE ")) {
			let pos = txt.indexOf(">");
			txt = txt.substring(pos+1);
		}
		let re = /<!--AUnwanted-->.*?<!--\/AUnwanted-->/gims
		txt = txt.replace(re,"");
		return {txt}
	}
	document.currentScript._AExtension = { PostImportFetchTasks : [ { function : f }] }