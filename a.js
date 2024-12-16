(function(win,doc) {
	if (win._defaultAObjectName) return;
	
	let AObjectNames = "A";
	
	let A = {
		__private : {},
		extend : {},
		version : "0.9"
	};
	A._rndAClass = ("A" + Math.random() + "_" + Date.now()).replace(".","");
	A._rndAElementClass = ("AE" + Math.random() + "_" + Date.now()).replace(".","");
	A._rndAElementHasAncestorGlobalsClass = ("AEHAG" + Math.random() + "_" + Date.now()).replace(".","");
	A._rndAElementHasLocalsClass = ("AEHL" + Math.random() + "_" + Date.now()).replace(".","");
	A._rndAParsedClass = ("AP" + Math.random() + "_" + Date.now()).replace(".","");
	A._rndANotParsedClass = ("ANP" + Math.random() + "_" + Date.now()).replace(".","");
	A.script = doc.currentScript 
	
	let __privateWatchedInfosName = ("__pvi" + Math.random()).replace(".","");;
	
	let ACustomElements = {  
		"AScript" : ["a-script"],
		"AConfig" : ["a-config"],
		"ADefinition" : ["a-definition"],
		"AClosure" : ["a-closure"],
		"ATagDef" : ["a-tagdef"]
	}
	
	let AElements = {
		"import" : ["import"],
		"let" : ["let"],
		"forEachOf" : ["forEachOf"],
		"globalRunFirst" : ["bootstrap"]
	}

	let AFunctions = {
		"watch" : ["watch"],
		"expose" : ["expose"],
		"injectFunction" : ["injectFunction"]
	}
	
	let AKeywords = {
		"currentElement" : ["currentElement"],
		"currentScript" : ["currentScript"],
		"AStore" : ["AStore"]
	}
	
	let AAttributes = {
		"forTag" : ["forTag"],
		"redefine" : ["redefine"],
		"forAttribute" : ["forAttribute","forAttr"],
		"attachInternals" : "attachInternals",
		"key" : "key",
		"namespace" : "namespace",
		"singleton" : "singleton",
		"singletonreplace" : "singletonreplace",
		"waitFor" : "waitFor"
	}
	
	let APrivateDataKeyWords = {
		_aID : "_aID",
		_reqaID : "_reqaID"
	}

	let AStyleClassCounter = 0;
	
	let unparsedScriptTypeValue = {
		"unparsed" : true,
		"a/unparsed" : true,
		"a/u" : true
	}
	
	let AIsInitialized = false;
	
	let watchCleanEventDelay = 60000;
	
	let addSourceMaps = true;
	
	let extendWarns = true;
	
	let keepCustomTagsInitState = false;
	
	let APromisesWaitForInitialize =  null;
	
	let AInnerTagsJobsCloneNode = true;
	let AInnerTagsJobs = []
	let TemplateLiteralFullCreationJobs = [];
	let ACustomTagFirstConnectedJobs = {};
	let ConnectedJobsByType = {}
	let AFetch = fetch;
	let APostImportFetchJobs = []
	
	let AConfig = {};
	
	updateAConfig();
	
	forEachKeyWord(AObjectNames, name => { win[name] = A })
	A.AObjectNames = AObjectNames;
	let AObjectName0 = typeof(AObjectNames)==="string" ? AObjectNames : AObjectNames[0];
	
	win._defaultAObjectName = AObjectName0;
	
	let ACustomElements0 = makeDefaultNamesDictionary(ACustomElements)
	let AElements0 = makeDefaultNamesDictionary(AElements)
	let AllACustomElementsNames = makeAllNamesDictionnary(ACustomElements);
	let AllACustomElementsNamesUC = makeAllNamesDictionnaryUC(ACustomElements);
	let AKeywords0 = makeDefaultNamesDictionary(AKeywords)
	let AAttributes0 = makeDefaultNamesDictionary(AAttributes)
	A.AFunctions = AFunctions;
	let AFunctions0 = makeDefaultNamesDictionary(AFunctions)
	
	let AInitializedPromiseResolve;
	let AInitializedPromiseReject;
	let AInitializedPromise =  new Promise((resolve,reject) => {
		AInitializedPromiseResolve = resolve
		AInitializedPromiseReject = reject
	})
	
	let AFirstRunTime = Date.now();
	let AFirstRuntimeCleanDelay = 30000;
	
	function updateAConfig() {
		let confText = getSourceContent(A.script).txt;
		confText = confText.trim();
		if (!confText.startsWith("}")&&!confText.endsWith("}")) {
			confText = "{" + confText + "}";
		}
		confText = "(" + confText + ")";
		let conf = eval(confText);
		updateObject(AConfig,conf);
		if (conf.AObjectName) {
			AObjectNames = conf.AObjectName
		}
		if (conf.AObjectNames) {
			AObjectNames = conf.AObjectNames
		}
		if (conf.addSourceMaps!=undefined) {
			addSourceMaps = conf.addSourceMaps;
		}
		if (conf.keepCustomTagsInitState!==undefined) {
			keepCustomTagsInitState = conf.keepCustomTagsInitState;
		}
	}
	
	function updateObject(target, source) {
	  if (Array.isArray(target) && Array.isArray(source)) {
	    target.length = source.length; 
	    for (let i = 0; i < source.length; i++) {
	      if (typeof source[i] === 'object' && source[i] !== null) {
	        target[i] = target[i] || {}; 
	        updateObject(target[i], source[i]); 
	      } else {
	        target[i] = source[i]; 
	      }
	    }
	  } else if (typeof target === 'object' && typeof source === 'object' && target !== null && source !== null) {
	    for (const key in target) {
	      if (!(key in source)) {
	        delete target[key]; 
	      }
	    }
	    for (const key in source) {
	      if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
	        target[key] = target[key] || {};
	        updateObject(target[key], source[key]);
	      } else {
			if (target[key]!==source[key]) {
	        	target[key] = source[key];
	        }
	      }
	    }
	  } else {
	    return source; 
	  }
	}
	A.updateObject = updateObject;
	
	function makeAllNamesDictionnary(obj,init) {
		let res = init || {};
		for (let key in obj) {
			let val = obj[key];
			if (typeof(val)=="object") {
				if (val.length>0) {
					for (const name of val) {
						res[name] = true;
					}
				}
			} else {
				res[val] = true;
			}
		}
		return res;
	}
	function makeAllNamesDictionnaryUC(obj,init) {
		let res = init || {};
		for (let key in obj) {
			let val = obj[key];
			if (typeof(val)=="object") {
				if (val.length>0) {
					for (const name of val) {
						res[name.toUpperCase()] = true;
					}
				}
			} else {
				res[val.toUpperCase()] = true;
			}
		}
		return res;
	}
	
	function makeDefaultNamesDictionary(obj) {
		let res = {};
		for (let key in obj) {
			let val = obj[key];
			if (typeof(val)=="object") {
				if (val.length>0) {
					res[key] = val[0]
				} else {
					res[key] = val;
				}
			} else {
				res[key] = val;
			}
		}
		return res;
	}
	
	function forEachKeyWord(kws,todo) {
		if (typeof(kws)=="object") {
			if (kws.length>0) {
				for (let i=0;i<kws.length;i++) {
					forEachKeyWord(kws[i],todo)
				}
			} else {
				todo(kws)
			}
		} else {
			todo(kws)
		}
	}
	A.forEachKeyWord = forEachKeyWord;
	
	function getAAttribute(element,name) {
		var value = null;
		forEachKeyWord(name,name => { value = value || element.getAttribute(name)});
		return value;
	}
	function removeAAttribute(element,name) {
		var value = null;
		forEachKeyWord(name,name => { element.removeAttribute(name)});
		return value;
	}
	
	
	function makeQuerySelectorForKeyWord(keyword,suffix,prefix) {
		var res = "";
		if (!suffix) {
			suffix = "";
		}
		if (!prefix) {
			prefix = "";
		}
		forEachKeyWord(keyword,function(kw) {
			if (res.length>0) {
				res += ",";
			}
			res += prefix + kw + suffix;
		})
		return res;
	}
	
	function getAttributeValueLC(element,name) {
		var value = element.getAttribute(name);
		if (value) value=value.toLowerCase();
		return value;
	}
	function getAttributeValue(element,name) {
		var value = element.getAttribute(name);
		return value;
	}

	function getJSONPath(obj, tpath, value, remove,datastack, getpathinfoinstead, root) {
    	try {
			let setval = true;
			if (remove=="noop")	{
				remove = false;
				setval = false;
			}
			var dt = obj;
			if (tpath===null||tpath===undefined) {
				return dt;
			}
			if (typeof(tpath)=="string") {
				if ((datastack instanceof Array) &&(datastack.length>0)) {
					var start = 0;
					var pstack = datastack.length-1;
					if (tpath.charAt(0)=='/') {
						start++;
						pstack = 0;
					}
					while (tpath.charAt(start)==".") {
						pstack--;
						start++;
					}  
					if (pstack<0) {
						pstack = 0;
					}
					if (start>0) {
						dt = datastack[pstack];
						tpath = tpath.substring(start,tpath.length);
					}
				}
				tpath = tpath.split(/\./g);
				if (getpathinfoinstead) {
					var isfromroot = dt == root || ((datastack instanceof Array) &&(datastack.length>0) && datastack[0]==dt);
					return {tpath : tpath, isfromroot : isfromroot}
				}
			}
			for (var j=0;j < tpath.length;j++) {
				var part = tpath[j];
				if (dt instanceof Array && parseInt(part)<0) {
					part = dt.length + parseInt(part);
				}
				if (j < tpath.length-1) {
					if (dt[part]==undefined) {
						if (value!==undefined&&!remove) {
							dt[part] = {};
						} else {
							return undefined;
						}
					}
					dt = dt[part];
				} else {
					var ret = dt[part];
					if (value!==undefined&&!remove) {
						if (setval) {
							dt[part] = value;							
						}
					} else {
						if (remove) {
							delete dt[part];
						}
					}
					if (ret===undefined&&part===""&&j==0) {  // allow "" for accessing the root object when the property "" does not exist
						return dt;
					}
					return ret;
				}
			}
    	} catch (e) {
    		console.warn(e);
    	}
	}
	A.getJSONPath = getJSONPath;

	function getOrCreateKeyedElement(tagName,key,htmlElement,namespace) {
		if (key==undefined) {
			return doc.createElement(tagName)	
		}
		key = "" + key;
		if (!htmlElement) htmlElement = doc.body;
		let elems = getAKeyedElements(htmlElement,namespace)
		let cand = elems[key];
		if (!cand) {
			cand = doc.createElement(tagName);
			let pv = getPrivate(cand)
			pv.__keyedkey = key;
			elems[key] = cand;
			cand.remove = (function() {let lelems = elems; let lkey = key; let lcand = cand;let oremove = lcand.remove ;return function remove() {delete lelems[lkey]; oremove.apply(this,arguments) }})()
		} else {			
			let pv = getPrivate(cand)
			if (pv.__keyedkey==undefined) {
				pv.__keyedkey = key;
			}
		}
		return cand;
	}
	A.getOrCreateKeyedElement = getOrCreateKeyedElement;
	
	function getAllKeyedElementsKeysSet(htmlElement,namespace) {
		let elems = getAKeyedElements(htmlElement,namespace)
		return new Set(Object.keys(elems))
	}
	A.getAllKeyedElementsKeysSet = getAllKeyedElementsKeysSet;

	function getAllKeyedElementsKeysArray(htmlElement,namespace) {
		let elems = getAKeyedElements(htmlElement,namespace)
		return Object.keys(elems)
	}
	A.getAllKeyedElementsKeysArray = getAllKeyedElementsKeysArray;

	function getAllKeyedElementsKeysObject(htmlElement,namespace) {
		let elems = getAKeyedElements(htmlElement,namespace)
		let res = {}
		for (let key in elems) {
			res[key] = true;
		}
		return res;
	}
	A.getAllKeyedElementsKeysObject = getAllKeyedElementsKeysObject;
	
	function removeKeyedElement(key,htmlElement,namespace) {
		if (key==undefined) {
			return;
		}
		key = "" + key;
		if (!htmlElement) htmlElement = doc.body;
		let elems = getAKeyedElements(htmlElement,namespace)
		let cand = elems[key];
		if (cand) {
			elems[key] = undefined;
			delete elems[key];
			cand.remove();
		}
		return cand;
	}
	A.removeKeyedElement = removeKeyedElement;

	function createClass(name,rules,insertbefore,insertin){
		if (typeof(rules)!="string") {
			rules = JSON.stringify(rules).trim();
			if (rules.startsWith("{")&&rules.endsWith("}")) {
				rules = rules.substring(1,rules.length-1).replace(/,/g,";");
			}
		}
		var createClassstyle = createClass._style;
		if (insertbefore) {
			createClassstyle = insertbefore._createClassStyleTag;
		} else {
			if (insertin) {
				createClassstyle = insertin._createClassStyleTag;
			}
		}
		
		if (!createClassstyle) {
		    createClassstyle = document.createElement('style');
		    createClassstyle.type = 'text/css';
		    var chead = document.getElementsByTagName('head');
		    if (chead.length==0) {
		    	var h = document.createElement('head');
		    	document.insertBefore(h,document.body);
		    	chead = [h];
		    }
		    if (insertbefore) {
		    	insertbefore.parentElement.insertBefore(createClassstyle,insertbefore);
		    	insertbefore._createClassStyleTag = createClassstyle;
		    } else {
		    	if (insertin) {
		    		insertininsertin.appendChild(createClassstyle);
				    insertin._createClassStyleTag = createClassstyle;
		    	} else {
				    chead[0].appendChild(createClassstyle);
				    createClass._style = createClassstyle;
				}
			}
		}
		var rule;
	    if(!(createClassstyle.sheet||{}).insertRule) {
	    	rule = (createClassstyle.styleSheet || createClassstyle.sheet).addRule(name, rules);
	    } else {
	    	rule = createClassstyle.sheet.insertRule(name+"{"+rules+"}",0);
	    	rule =  (createClassstyle.sheet.rules || createClassstyle.sheet.cssRules)[0]
	    }
	    return rule;
	}
	
	function getCreatedClassStyleTag() {
		let res = "";
		for (rule of createClass._style.sheet.rules) {
			res += rule.cssText + "\n"
		}
		let style = document.createElement("style")
		style.innerHTML = res;
		return style;
	}
	A.getCreatedClassStyleTag = getCreatedClassStyleTag;
	
	function getFunctionBody(f) {
		if (typeof(f)!="function") {
			return;
		}
		let txt = f.toString();
		let pos1 = txt.indexOf("{");		
		let pos2 = txt.lastIndexOf("}");
		if (pos1>0&&pos2>pos1) {
			return txt.substring(pos1,pos2+1);
		} else {
			let pos1 = txt.indexOf("=>");	
			return txt.substring(pos1+2);
		}
	}

	function extFetch(src) {
		if (src) {
			return AFetch.apply(this,arguments);
		} else {
			return new Promise((resolve) => { 
					let res = {ok : true, text : function() { return ""}};
					resolve(res);
					return res;
				} 
			)
		}
	}
	let globalFunctionsRepository = {}
	function addToGlobalFunctionsRepositoryOrGetId(f) {
		if (f._AglobalFunctionsRepositoryID) {
			return f._AglobalFunctionsRepositoryID;
		}
		let name = f.name || '';
		if (globalFunctionsRepository[name]==undefined) {
			globalFunctionsRepository[name] = [];
		}
		let index = globalFunctionsRepository[name].push(f) -1;
		f._AglobalFunctionsRepositoryID = {name, index}
		return f._AglobalFunctionsRepositoryID
	}
	function getFromGlobalFunctionsRepository(id) {
		return globalFunctionsRepository[id.name][id.index];
	}
	A.__private.getFromGlobalFunctionsRepository = getFromGlobalFunctionsRepository;

	let singletons = new Map()
	function singletonExist(name) {
		return singletons.has(name)
	}
	function addSingleton(name,obj) {
		let existing = singletons.get(name)
		if (existing) {
			deleteGlobalObject(existing)
		}
		singletons.set(name,obj)
	}
	function deleteSingleton(name,obj) {
		let existing = singletons.get(name)
		if (existing) {
			deleteGlobalObject(existing)
		}
		singletons.delete(name)
	}

	let globalObjectsCounter = 0;
	let globalObjects = {}
	function addGlobalObject(obj) {
		if (obj[APrivateDataKeyWords._aID]!=undefined) {
			return obj[APrivateDataKeyWords._aID]
		}
		var count;
		if (obj[APrivateDataKeyWords._reqaID]!=undefined) {
			if (!globalObjects[obj[APrivateDataKeyWords._reqaID]]) {
				count = "" + obj[APrivateDataKeyWords._reqaID]
			}
		}
		if (count==undefined) count = "" + (globalObjectsCounter++)
		globalObjects[count] = obj;
		obj[APrivateDataKeyWords._aID] = count;
		return count;
	}
	
	function getGlobalObject(key) {
		return globalObjects[""+key];
	} 
	A.__private.getGlobalObject = getGlobalObject;
	
	function getGlobalObjectsOrphans() {
		let res = {};
		for (let key in globalObjects) {
			let obj = globalObjects[key]
			if (obj.isConnected==false&&!obj.__AGOOrphansIgnore) {
				res[key] = obj;
			}
		}
		return res;
	}
	A.__private.getGlobalObjectsOrphans = getGlobalObjectsOrphans;
	
	function cleanGlobalObjectsOrphans(orph) {
		if (orph==undefined) orph = getGlobalObjectsOrphans()
		for (let key in orph) {
			deleteGlobalObject(key)
		}
	}
	A.__private.cleanGlobalObjectsOrphans = cleanGlobalObjectsOrphans;
	
	function deleteGlobalObject(key) {
		if (key==undefined) return;
		if (typeof(key)=="object") {
			if (key[APrivateDataKeyWords._aID]!=undefined) {
				key = key[APrivateDataKeyWords._aID];
			} else {
				if (key instanceof HTMLElement) {
					let singname = getAAttribute(key,AAttributes.singleton)
					if (singname) {
						singletons.delete(singname)
					}
					return key.remove();
				}
				return;
			}
		}
		key = "" + key;
		let obj = getGlobalObject(key);
		let ret = obj;
		if (!obj) return;
		if (obj.parentElement) {
			let singname = getAAttribute(obj,AAttributes.singleton)
			if (singname) {
				singletons.delete(singname)
			}
			ret = obj.remove();
		}
		let aw = getAWatched(obj)
		for (let i=0;i<aw.length;i++) {
			let f = aw[i]
			let evtchangefs = f.evtchangefs;
			for (let keyc in evtchangefs) {
				let o = evtchangefs[keyc]
				o.obj.removeEventListener(keyc + " change",o.evtf);
			}
		}
		let as = getAScripts(obj);
		for (let i=0;i<as.length;i++) {
			let s = as[i]
			deleteGlobalObject(s);
		}
		let pv = getPrivate(obj);
		deleteGlobalObject(pv.__script);
		
		delete globalObjects[key];
		
		if (typeof(getA(obj).ondestroy)=='function') { getA(obj).ondestroy() };
		
		return ret;
	}
	A.__private.deleteGlobalObject = deleteGlobalObject;
	A.deleteGlobalObject = deleteGlobalObject;
	A.removeGlobalObject = deleteGlobalObject;
	
	var globalSharedObjects = {}
	var namespaceSharedObjects = {}
	var globalSharedWatchedObjects = {}
	var namespaceSharedWatchedObjects = {}
	function getGlobalSharedObject(name) {
		if (name==undefined) return null;
		let res = globalSharedObjects[name]
		if (res==undefined) {
			res = {}
			globalSharedObjects[name] = res;
		}
		return res;
	}
	A.__private.getGlobalSharedObject = getGlobalSharedObject;
	
	function dumpAllStates() {
		let obj = { g : globalSharedObjects, gw : globalSharedWatchedObjects, n : namespaceSharedObjects, nw : namespaceSharedWatchedObjects}
		let a = {}
		let allas = doc.querySelectorAll("." + A._rndAElementHasAncestorGlobalsClass)
		for (let i=0;i<allas.length;i++) {
			let el = allas[i];
			let ancg = getPvAncGlobals(el);
			let noelem = {}
			for (let key in ancg) {
				noelem[key] = ancg[key].obj
			}
			let o = {aid : el[APrivateDataKeyWords._aID], id : el.id, ancg : noelem }
			a[o.aid] = o;
		}
		obj.ancgs = a;
		let l = {};
		let allls = doc.querySelectorAll("." + A._rndAElementHasLocalsClass)
		for (let i=0;i<allls.length;i++) {
			let el = allls[i];
			let loc = getPvLocals(el);
			let noelem = {}
			for (let key in loc) {
				noelem[key] = loc[key].obj
			}
			let o = {aid : el[APrivateDataKeyWords._aID], id : el.id, loc : noelem }
			l[o.aid] = o;
		}
		obj.locs = l;
		return JSON.stringify(obj)
	}
	A.dumpAllStates = dumpAllStates;
	
	function restoreAllStates(dump) {
		if (typeof(dump)=="string") dump = JSON.parse(dump);
		if (typeof(dump.g)=='object') {
			updateObject(globalSharedObjects,dump.g)
		}
		if (typeof(dump.gw)=='object') {
			updateObject(globalSharedWatchedObjects,dump.gw)
		}
		if (typeof(dump.n)=='object') {
			updateObject(namespaceSharedObjects,dump.n)
		}
		if (typeof(dump.nw)=='object') {
			updateObject(namespaceSharedWatchedObjects,dump.nw)
		}
		if (typeof(dump.ancgs)=='object') {
			for (let aid in dump.ancgs) {
				let o = dump.ancgs[aid]
				let el = getGlobalObject(aid)
				if (o.id) {
					let els =  doc.querySelectorAll("#" + o.id)
					if (els.length==1) {
						el = els[0]
					}
				}
				let ancg = getPvAncGlobals(el);
				for (let key in ancg) {
					updateObject(ancg[key].obj,o.ancg[key])
				}
			}
		}
		if (typeof(dump.locs)=='object') {
			for (let aid in dump.locs) {
				let o = dump.locs[aid]
				let el = getGlobalObject(aid)
				if (o.id) {
					let els =  doc.querySelectorAll("#" + o.id)
					if (els.length==1) {
						el = els[0]
					}
				}
				let loc = getPvLocals(el);
				for (let key in loc) {
					updateObject(loc[key].obj,o.loc[key])
				}
			}
		}
	}
	A.restoreAllStates = restoreAllStates;
	
	function getNamespaceSharedObject(name,namespace) {
		if (namespace=="undefined") namespace = AObjectName0;
		if (name==undefined) return null;
		let sharedObjects = namespaceSharedObjects[namespace]
		if (sharedObjects==undefined) {
			sharedObjects = {}
			namespaceSharedObjects[namespace] = sharedObjects;
		}
		let res = sharedObjects[name]
		if (res==undefined) {
			res = {}
			sharedObjects[name] = res;
		}
		return res;
	}
	A.__private.getNamespaceSharedObject = getNamespaceSharedObject;

	function recurseGetSetProxy(value,evtNamePrefix,obj,target) {
		if (typeof(value)=='object'&&value!=null) {
			value = getSetProxy(evtNamePrefix,value,target)
			for (key in value) {
				let val = value[key];
				value[key] = recurseGetSetProxy(val,evtNamePrefix +"." +key,obj,target);
			}
		}
		return value;
	}
	
	function setProxyDelayedDispatchEvents(evtobj,evt) {
		let ddobj = evtobj.__spddde
		if (ddobj==undefined) {
			ddobj = {}
			evtobj.__spddde = ddobj
		}
		if (!evtobj.__spdddetid) {
			(function() {
				let obj = ddobj;
				let levtobj = evtobj
				levtobj.__spdddetid = setTimeout(function() {
					delete levtobj.__spddde
					levtobj.__spdddetid = undefined;
					delete levtobj.__spdddetid;
					A.__private.__spdddeobj = {}
					for (let key in obj) {
						levtobj.dispatchEvent(obj[key])
					}
					delete A.__private.__spdddeobj;
				},0)
			})()
		}
		ddobj[evt.type] = evt;
	}

	function getSetProxy(evtNamePrefix,obj,target) {
		let res = obj;
		(function(){
			let origObj = obj;
			let name = evtNamePrefix;
			let evtobj = target || document;
			let handler = {
				set(obj, prop, value,receiver) {
					if (typeof(value)=='object'&&value!==null) {
						value = recurseGetSetProxy(value,name + "." + prop,value,evtobj)
					}
					let res = Reflect.set(obj, prop, value,receiver);
					var evt = new CustomEvent(name + "." + prop + " change");
					setProxyDelayedDispatchEvents(evtobj,evt);	
					return res;
				}
			}
			res = new Proxy(res,handler);
		})();
		return res;
	}
	A.__private.getSetProxy = getSetProxy;
	

	function getGlobalSharedWatchedObject(name) {
		if (name==undefined) return null;
		let res = globalSharedWatchedObjects[name]
		if (res==undefined) {
			res =  getSetProxy(name,{})
			globalSharedWatchedObjects[name] = res;
		}
		return res;
	}
	A.__private.getGlobalSharedWatchedObject = getGlobalSharedWatchedObject;
	
	function getNamespaceSharedWatchedObject(name,namespace) {
		if (namespace=="undefined") namespace = AObjectName0;
		if (name==undefined) return null;
		let sharedObjects = namespaceSharedWatchedObjects[namespace]
		if (sharedObjects==undefined) {
			sharedObjects = {}
			namespaceSharedWatchedObjects[namespace] = sharedObjects;
		}
		let res = sharedObjects[name]
		if (res==undefined) {
			res =  getSetProxy(namespace + " " + name,{})
			sharedObjects[name] = res;
		}
		return res;
	}
	A.__private.getNamespaceSharedWatchedObject = getNamespaceSharedWatchedObject;
	
	
	function expose(exposeAStore,arg1,arg2) { 
		if (typeof(exposeAStore)!='object') {
			exposeAStore = window;
		}
		if (arg2!=undefined) { 
			let f = typeof(arg1)=='function' ? arg1 : arg2; 
			let n = typeof(arg1)=='function' ? arg2 : arg1; 
			exposeAStore[n] = f 
		} else { 
			exposeAStore[arg1.name] = arg1 
		} 
	};
	A.__private.expose = expose;
	A.__private.exposeBody = getFunctionBody(expose).replace(/\n|\r/g,"").replace(/([\t]|\s+)/g," ").replace(/;+/g,";");
	
	function injectFunction(f,injectFunctionAStore,exposename) { 
		if (typeof(f)=='function') { 
			f = f.toString(); 
		}; 
		var F; 
		try { 
			eval('F=' + f) 
		} catch(e) { 
			F = function error() { 
				console.log(e)
			}
		}; 
		if (injectFunctionAStore) { 
			expose(injectFunctionAStore,F,exposename) 
		}; 
		return F; 
	}; 
	A.__private.injectFunction = injectFunction;
	A.__private.injectFunctionBody = getFunctionBody(injectFunction).replace(/expose/g,AFunctions0.expose).replace(/\n|\r/g,"").replace(/([\t]|\s+)/g," ").replace(/;+/g,";").replace(/expose\(injectFunctionAStore,/,"expose(");
	
	function checkExtensionScriptRunningOrThrow() {
		let cs = document.currentScript;
		if (cs) {
			if (cs.getAttribute("a-extension")!==null) {
				if (!AIsInitialized) {
					return true;
				}
			}
		}
		throw "Only available during an extension script first run"
		
	}
	
	function addInitWait(promise) {
		checkExtensionScriptRunningOrThrow();
		if (!(promise instanceof Promise)) {
			throw "Invalid addInitWait. Must be a Promise"
		}
		if (!APromisesWaitForInitialize) {
			APromisesWaitForInitialize = []
		}
		APromisesWaitForInitialize.push(promise);
		if (extendWarns) {
			console.warn(document.currentScript,"added init wait promise ",promise)
		}
	}
	if (AConfig.noAExtend!==true) {
		A.extend.addInitWait = addInitWait;
	}
	
	function getInternalFunction(AFunctionName) {
		AFunctionName = "" + AFunctionName
		checkExtensionScriptRunningOrThrow();
		let check = eval("typeof("+AFunctionName+")");
		if (check!="function") {
			throw "Unknown function " + AFunctionName;
		}
		let F = undefined;
		eval("F = " + AFunctionName);
		return F;
	}
	if (AConfig.noAExtend!==true) {
		A.extend.getInternalFunction = getInternalFunction;
	}
	
	function replaceInternalFunction(AFunctionName,fct) {
		AFunctionName = "" + AFunctionName
		checkExtensionScriptRunningOrThrow();
		let check = eval("typeof("+AFunctionName+")");
		if (check!="function") {
			throw "Unknown function " + AFunctionName;
		}
		if (typeof(fct)!="function") {
			throw "argument 2 must be a function"
		}
		let code = fct.toString();
		eval(AFunctionName + "=" + code)
		if (extendWarns) {
			console.warn(document.currentScript,"replaced internal function " + AFunctionName + " with",fct)
		}
	}
	if (AConfig.noAExtend!==true) {
		A.extend.replaceInternalFunction = replaceInternalFunction;
	}
	
	function addInternalFunction(AFunctionName,fct) {
		AFunctionName = "" + AFunctionName
		checkExtensionScriptRunningOrThrow();
		let check = eval("typeof("+AFunctionName+")");
		if (check!="undefined") {
			throw "Error " + AFunctionName + " already exists with type " + check;
		}
		if (typeof(fct)!="function") {
			throw "argument 2 must be a function"
		}
		let code = fct.toString();
		eval("" + AFunctionName + "=" + code)
		let F = undefined;
		eval("F = " + AFunctionName);
		if (extendWarns) {
			console.warn(document.currentScript,"added internal function " + AFunctionName + "",fct)
		}
		return F;
	}
	if (AConfig.noAExtend!==true) {
		A.extend.addInternalFunction = addInternalFunction;
	}
	
	function getAElementTarget(htmlAElement) {
		if (htmlAElement.__AElementTarget) {
			return htmlAElement.__AElementTarget;
		}
		let target = getAttributeValue(htmlAElement,"target")
		if (target) {
			let etarget =  getJSONPath(htmlAElement,target)
			if (etarget) {
				htmlAElement.__AElementTarget = etarget;
				return etarget;
			}
		}
		let targetSelector = getAttributeValue(htmlAElement,"targetSelector")
		if (targetSelector) {
			let etarget =  doc.querySelector(targetSelector)
			if (etarget) {
				htmlAElement.__AElementTarget = etarget;
				return etarget;
			}
		}
		
		let tmp = htmlAElement.previousElementSibling
		while (tmp&&(AllACustomElementsNamesUC[tmp.tagName]||tmp.classList.contains(A._rndAClass)||tmp.getAttribute("AIgnore")!=null)) {
			tmp = tmp.previousElementSibling
		}
		let res = undefined;
		if (tmp) {
			res =  tmp;
		} else {
			res = htmlAElement.parentElement;
		}
		if (!res[AObjectName0]) {
			res[AObjectName0] = { __private : { __ascripts : [] }};
		} else {
			if (!res[AObjectName0].__private) {
				res[AObjectName0].__private = { __ascripts : [] }
			} else {
				if (!res[AObjectName0].__private.__ascripts) {
					res[AObjectName0].__private.__ascripts = []
				}
			}
		}
		if (res["_parent" + AObjectName0]===undefined) {
			let pres = res;
			let stack = [pres];
			if (pres.parentElement) {//null when added a the shadowRoot
				do {
					pres = pres.parentElement;
					stack.push(pres)
				} while(pres["_parent" + AObjectName0]===undefined&&pres[AObjectName0]===undefined&&pres.parentElement!=null)
			}
			let parent = null;
			if (pres[AObjectName0]!=undefined) {
				parent = pres;
			} else {
				if (pres["_parent" + AObjectName0]!==undefined) {
					parent = pres["_parent" + AObjectName0];
				} else {
					if (pres.parentElement==null) {
						parent = null;
					}
				}
			}
			for (let elem of stack) {
				if (elem!=parent) {
					elem["_parent" + AObjectName0] = parent;
				}
			}
		}
		getPrivate(res)._isAElementTarget = true;
		htmlAElement.__AElementTarget = res;
		return res;
	}

	var witnessElem = doc.createElement("span")
	function getTemplateLiteralFullCreation(elem,watched,allowhtml,counter) {
		if (counter==undefined) {
			counter = 0;
		}
		let watchstart = "";
		let watchend = ";";
		if (watched) {
			watchstart = AFunctions0["watch"] + "(() => {";
			watchend = "});";
		}
		let jobsInfos = null;
		let tagName = elem.tagName;
		if (tagName.startsWith("A:")) {
			tagName = tagName.substring(2,tagName.length)
		}
		if (TemplateLiteralFullCreationJobs.length>0) {
			let pElem = elem.parentElement;
			let ps = elem.previousSibling;
			let ns = elem.nextSibling;
			jobsInfos = {};
			function setTagName(name) {
				jobsInfos.tagName = name
			}
			function addAttribute(name,value) {
				if (!jobsInfos.addAttrs) {
					jobsInfos.addAttrs = []
				}
				jobsInfos.addAttrs.push({name, value})
			}
			function addEventListener(name,value) {
				if (!jobsInfos.addEvts) {
					jobsInfos.addEvts = []
				}
				jobsInfos.addEvts.push({name, value})
			}
			function addOnMethod(name,value,before,after) {
				if (!jobsInfos.addOnms) {
					jobsInfos.addOnms = []
				}
				jobsInfos.addOnms.push({name, value, before, after})
			}
			let jobOptions = {}
			for (let i=0;i<TemplateLiteralFullCreationJobs.length;i++) {
				let job = TemplateLiteralFullCreationJobs[i]
				if (typeof(job.function)!="function") {
					console.error("Invalid tag creation configuration",job);
					continue;
				}
				job.function(elem,addAttribute,addEventListener,addOnMethod,setTagName,jobOptions)
				
				if (elem.parentElement!=pElem||elem.previousSibling!=ps||elem.nextSibling!=ns) {
					console.error("Invalid tag creation configuration",job," Remove the Element or modify its position is forbidden");
					pElem.insertBefore(elem,ns);
				}
			}
			if (jobInfos.tagName&&jobInfos.tagName.length>0) {
				tagName = jobInfos.tagName;
			}
		}
		let res = "(function f0(){"
			+ "f0.toString = function(){ return `"+elem.outerHTML.replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/<a:/gi,"<").replace(/</gi,"` + '<' + `")+"`};" 
		let keyvalue = getAAttribute(elem,AAttributes.key)
		let nsvalue = getAAttribute(elem,AAttributes.namespace) 
		if (nsvalue) {
			nsvalue = '"' + nsvalue + '"'
		} else {
			nsvalue = "undefined";
		}
		let name = "element" + counter
		let pename = counter > 0 ?  "element" + (counter-1) : "currentElement"
		if (keyvalue!=null&&keyvalue.length>0) {
			res += "let "+name+"="+AObjectName0+".getOrCreateKeyedElement('"+tagName+"',`"+keyvalue+"`,"+pename+","+nsvalue+");"
			res += "if ("+name+".parentElement==null) {" //created
		} else {
			res += "let "+name+"=document.createElement('"+tagName+"');"
		}
		for (const attr of elem.attributes) {
			if (attr.name.startsWith("on")) {
				if (witnessElem[attr.name]!==undefined) { //not using elem, as some attributes values may cause error logs when read
					res += watchstart + ""+name+".setAttribute(`_"+attr.name+"`, `"+attr.value+"`)" + watchend
				} else {
					res += watchstart + ""+name+".setAttribute(`"+attr.name+"`, `"+attr.value+"`)" + watchend
				}
				res += watchstart + "let f=currentElement."+AObjectName0+".injectFunction(`function(event) {"+attr.value+"}`,false);"
				res += ""+name+".addEventListener(`"+attr.name.substring(2)+"`,f)"+ watchend
			} else {
		    	res += watchstart + ""+name+".setAttribute(`"+attr.name+"`, `"+attr.value+"`)" + watchend
		    }
		}
		if (jobsInfos) {
			let addAttrs = jobsInfos.addAttrs
			let addEvts = jobsInfos.addEvts
			let addOnms = jobsInfos.addOnms
			if (addAttrs) {
				for (let i=0;i<addAttrs.length;i++) {
					let attr = addAttrs[i];
					res += watchstart + ""+name+".setAttribute(`"+attr.name+"`, `"+attr.value+"`)" + watchend
				}
			}
			if (addEvts) {
				for (let i=0;i<addEvts.length;i++) {
					let evt = addEvts[i];
					if (typeof(evt.value)=='function') {
						let id = addToGlobalFunctionsRepositoryOrGetId(evt.value);
						res += ""+name+".addEventListener(`"+evt.name+"`," + AObjectName0+".__private.getFromGlobalFunctionsRepository("+JSON.stringify(id)+"));"
					}
				}
			}
			if (addOnms) {
				for (let i=0;i<addOnms.length;i++) {
					let onm = addOnms[i];
					if (typeof(onm.value)=='function') {
						let id = addToGlobalFunctionsRepositoryOrGetId(onm.value);
						res += ""+name+"[`"+onm.name+"`] = (function() {let o = "+name+"[`"+onm.name+"`]; return function() { "
						if (onm.before) {
							res += AObjectName0+".__private.getFromGlobalFunctionsRepository("+JSON.stringify(id)+")).apply(this,arguments);"
						}
						res += "let res = o.apply(this,arguments);"
						if (onm.after||!(onm.before)) {
							res += AObjectName0+".__private.getFromGlobalFunctionsRepository("+JSON.stringify(id)+")).apply(this,arguments);"
						}
						res += " return res; }})();";
					}
				}
			}
		}
		let count=1;
		for (const child of elem.childNodes) {
			res += "let child" + (count) + "="
			if (child.nodeType === Node.ELEMENT_NODE) {
				if (child.tagName=="SCRIPT"&&unparsedScriptTypeValue[child.getAttribute("type")]) {
					res += "document.createTextNode('');";
				 	res += watchstart + "child" + count + ".nodeValue=`"+child.innerHTML.replace(/</gi,"` + '<' + `")+"`" + watchend
				} else {
		      		res += getTemplateLiteralFullCreation(child,watched,allowhtml,counter+1) + ";";
		      	}
		    } else if (child.nodeType === Node.TEXT_NODE || child.nodeType === Node.CDATA_SECTION_NODE) {
				if (allowhtml) {
					res += "document.createElement('span');"
					res += watchstart + "child" + count + ".innerHTML=`"+child.nodeValue.replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"`" + watchend
				} else {
				 	res += "document.createTextNode('');";
				 	res += watchstart + "child" + count + ".nodeValue=`"+child.nodeValue.replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"`" + watchend
				 }
		    }
		    res += ""+name+".appendChild(child"+count+");"
		    count++;
		}
		if (keyvalue!=null&&keyvalue.length>0) {
			res += "};"	
		}
		res += "return "+name+";"
		res += "})()";
		return res;
	}
	
	function getA(currentElement) {
		let obj = currentElement[AObjectName0];
		if (!obj) {
			obj = { __private : { __ascripts : [] }}
			currentElement[AObjectName0] = obj;
		}
		return obj;
	}
	A.getA = getA;
	
	function getPrivate(currentElement) {
		let obj = getA(currentElement)
		if (!obj) {
			obj = { __private : { __ascripts : [] }}
			currentElement[AObjectName0] = obj;
		}
		let pv = obj.__private;
		if (!pv) {
			pv = { __ascripts : [] }
			obj.__private = pv;
		}
		return pv;
	}
	A.__private.getPrivate = getPrivate;
	
	function getAWatchedVars(currentElement) {
		let pv = getPrivate(currentElement);
		let awatched = pv.__awatchedvars
		if (!awatched) {
			awatched = new Map();
			pv.__awatchedvars = awatched;
		}
		return awatched;
	}
	A.__private.getAWatchedVars = getAWatchedVars;
	
	function getAScripts(currentElement) {
		let pv = getPrivate(currentElement);
		let ascripts = pv.__ascripts
		if (!ascripts) {
			ascripts = [];
			pv.__ascripts = ascripts;
		}
		return ascripts;
	}
	A.__private.getAScripts = getAScripts;
	
	function getAWatched(currentElement) {
		let pv = getPrivate(currentElement);
		let awatched = pv.__awatched
		if (!awatched) {
			awatched = [];
			pv.__awatched = awatched;
		}
		return awatched;
	}
	A.__private.getAWatched = getAWatched;
	
	function getAImported(currentElement) {
		let pv = getPrivate(currentElement);
		let aimp = pv.__aimported
		if (!aimp) {
			aimp = { scripts : [], css : [], html : [] };
			pv.__aimported = aimp;
		}
		return aimp;
	}
	A.__private.getAImported = getAImported;
	
	function getAKeyedElements(currentElement,namespace) {
		let pv = getPrivate(currentElement);
		if (namespace) {
			let akeyedelems = pv.__nsakeyedelems
			if (!akeyedelems) {
				akeyedelems = {};
				pv.__nsakeyedelems = akeyedelems;
			}
			let nsakeyedelems = akeyedelems[namespace]
			if (!nsakeyedelems) {
				nsakeyedelems = {};
				akeyedelems[namespace] = nsakeyedelems;
			}
			return nsakeyedelems;
		}
		let akeyedelems = pv.__akeyedelems
		if (!akeyedelems) {
			akeyedelems = {};
			pv.__akeyedelems = akeyedelems;
		}
		return akeyedelems;
	}
	A.__private.getAKeyedElements = getAKeyedElements;
	
	function getAAppliedTags(currentElement) {
		let pv = getPrivate(currentElement);
		let appliedtags = pv.__appliedtags
		if (!appliedtags) {
			appliedtags = {};
			pv.__appliedtags = appliedtags;
		}
		return appliedtags;
	}
	A.__private.getAAppliedTags = getAAppliedTags;
	
	function getPvAncGlobalsIfExists(currentElement) {
		let pv = getPrivate(currentElement);
		let ancg = pv.ancGlobals
		return ancg;
	}
	
	function getPvAncGlobals(currentElement) {
		let pv = getPrivate(currentElement);
		let ancg = pv.ancGlobals
		if (!ancg) {
			ancg = {}
			pv.ancGlobals = ancg;
		}
		return ancg;
	}
	A.__private.getPvAncGlobals = getPvAncGlobals
	
	function getPvLocals(currentElement) {
		let pv = getPrivate(currentElement);
		let locs = pv.Locals
		if (!locs) {
			locs = {}
			pv.Locals = locs;
		}
		return locs;
	}
	A.__private.getPvLocals = getPvLocals
	
	function setPvAncGlobals(currentElement,ancg) {
		let pv = getPrivate(currentElement);
		if (typeof(ancg)!="object") return;
		pv.ancGlobals = ancg;
	}
	
	function updatePvAncGlobals(currentElement,ancg) {
		let cur = getPvAncGlobals(currentElement);
		if (typeof(ancg)!="object") return;
		for (let key in ancg) {
			cur[key] = ancg[key]
		}
	}
	
	var elementForEachOfSelector;
	var elementWithKeyAttrSelector;
	function resolveForEachOf(element,watch) {
		if (elementForEachOfSelector == undefined) elementForEachOfSelector =  makeQuerySelectorForKeyWord(AElements.forEachOf);
		if (elementWithKeyAttrSelector == undefined) elementWithKeyAttrSelector =  makeQuerySelectorForKeyWord(AAttributes.key,"]","[");
		let allforeach= element.querySelectorAll(elementForEachOfSelector);
		for (let i=allforeach.length-1;i>=0;i--) { //reverse to parse imbricated ForEachOf with inner ones first
			let foreach = allforeach[i];
			let attributes = foreach.attributes;
			if (attributes.length!=1) {
				console.error("Invalid <" +AElements0.forEachOf+ ">: exacly one attribute is required, in the form of Iterable=\"VarName\"",element,foreach)
				throw "Invalid <" +AElements0.forEachOf+ "> ("+foreach.outerHTML+"): exacly one attribute is required, in the form of Iterable=\"VarName\"" 
			}
			let loopnamespace = ("nsFEO" + i + Math.random()).replace(/\./g,"_");
			let allKeyedElems = foreach.querySelectorAll(elementWithKeyAttrSelector)
			for (let j=0;j<allKeyedElems.length;j++) {
				let el = allKeyedElems[j];
				if (getAAttribute(el,AAttributes.namespace)) {
					console.error("It's illegal to use a namespace attribute in a <" +AElements0.forEachOf+ ">. It's creates it's own namespace")
				}
				el.setAttribute(AAttributes0.namespace,loopnamespace)
			}
			let attr = attributes[0];
			let variable = attr.value;
			let obj = attr.name
			if (obj.startsWith("a:")) {
				let poseq = variable.indexOf("=")
				if (poseq>0) {
					obj = variable.substring(0,poseq).trim()
					variable = variable.substring(poseq+1)
				}
			}
			let tobj = obj.split(/\./g)
			let txt = "watch(function() {"
				+ "let ce = " + AObjectName0 + ".__private.getAKeyedElements(currentElement,'"+loopnamespace+"');"
				+ "let namespace='"+loopnamespace+"';"
				+ "for (let key in ce) { let e = ce[key]; let pv = "+AObjectName0+".__private.getPrivate(e); pv.__keyedkeymem = pv.__keyedkey;delete pv.__keyedkey; };"
				+ "let obj = " + obj + ";"
				if (tobj.length>1) {
					txt += "let length = " + obj + ".length || " + obj + ".size;"
					txt += "let aw = " +AObjectName0+".__private.getAWatchedVars(currentScript); let awo = aw.get("+tobj[0]+");if (awo) obj = awo.obj."+obj.substring(tobj[0].length+1)+";"
				}
			txt += "let loopForEach = 0;"
				+ "if (typeof(obj)=='object'&&typeof(obj.forEach)!=='function') obj = new Map(Object.entries(object));"
				+ "if (typeof(obj.forEach)!=='function') throw 'Invalid use of "+obj+" in " +AElements0.forEachOf+ ". It of type' + typeof(obj);"
				+ "obj.forEach(("+variable+") => {"
					+ "let forEach=loopForEach;"
					+ getSourceContent(foreach).txt + ";"
					+ "loopForEach++;"
				+ "});"
				+ "for (let key in ce) { let e = ce[key]; let pv = "+AObjectName0+".__private.getPrivate(e); if (pv.__keyedkeymem!=undefined&&pv.__keyedkey==undefined) { e.remove() } };"
			+"});"
			foreach.outerHTML = txt;
		}
	}
	
	var elementGlobalRunFirstSelector;
	function resolveGlobalRunFirst(element,watch,forcedATarget) {
		if (elementGlobalRunFirstSelector == undefined) elementGlobalRunFirstSelector =  makeQuerySelectorForKeyWord(AElements.globalRunFirst);
		let allruns= element.querySelectorAll(elementGlobalRunFirstSelector);
		for (let i=0;i<allruns.length;i++) {
				let run = allruns[i]
				let txt = run.innerHTML
				let script = document.createElement("script");
				script.innerHTML = txt;
				doc.body.appendChild(script)
				let addlines = "";
				if (addSourceMaps) {
					let nbCurLines = run.outerHTML.split(/\n/g).length
					for (let i=1;i<nbCurLines;i++) {
						addlines += "\n";
					}
				}
				run.outerHTML = addlines;
		}
	}
	
	var elementLetSelector;
	function resolveLetDeclarations(element,watch,forcedATarget) {
		if (elementLetSelector == undefined) elementLetSelector =  makeQuerySelectorForKeyWord(AElements.let);
		let ATarget = forcedATarget || getAElementTarget(element)
		let namespace = getAttributeValue(element,"namespace");
		let qnamespace =  namespace?"'"+namespace+"'":"undefined"
		let alldeclares = element.querySelectorAll(elementLetSelector);
		let declared = {};
		let declaredglobals = {}
		let declarednamespaceglobals = {}
		let declaredancestorglobals = {}
		let declareddescendantsglobals = {}
		let declaredlocals = {}
		let hasancestorglobals = false;
		let haslocals = false;
		let declaredbytype = { g : declaredglobals, n : declarednamespaceglobals, a : declaredancestorglobals, d : declareddescendantsglobals, l : declaredlocals }
		for (let i=0;i<alldeclares.length;i++) {
			let watchedvars = {};
			let haswatchedvars = false;
			let txt = "";
			let declare = alldeclares[i];
			let declareText = getTextContent(declare).txt;
			let globalsRE = /(^|;|\|\\n})([ \t]*(let|var|const)[ \t]+)*[ \t]*(watched )*[ \t]*(nsG|namespaceG|aG|ancestorG|dG|descendantG||descendantsG|g)lobal([ \t]+)(watched )*[ \t]*((([ \t]*)(([^,;\n$]+)[ \t]*)([ \t]*)(,*))+)/gim; //todo: make a more general/robust parsing that supports comma in strings, and multiline for functions
			let match = globalsRE.exec(declareText);
			let lastpos = 0;
			while (match!= null) {
				txt += declareText.substring(lastpos,match.index);
				lastpos = match.index + match[0].length;
				let watched = (match[4] || match[7])!=undefined;
				watch = watch || watched;
				let type = match[5].charAt(0) //n,a,d, or g
				let declarations = match[8];
				let tdeclarations = declarations.split(/,/g);
				let otype = declaredbytype[type] || declaredglobals
				for (let j=0;j<tdeclarations.length;j++) {
					let letstart = match[1] || "";
					letstart += match[2] || "let "
					let letequals = " = "+AObjectName0+".__private."
					let letequalsend = watched ? "WatchedObject" : "Object"; 
					let letend = "";
					let declaration = tdeclarations[j].trim();
					let tdeclaration = declaration.split("=");
					let fullname = tdeclaration[0].trim();
					let value = tdeclaration[1] || "null"
					let valueremove = false;
					if (value=="null") {
						valueremove = "'noop'";
					}
					let tfullname = fullname.split(/\./d);
					let name = tfullname[0];	
					let dname = name, gname = name;						
					let tnsname = name.split(/:/g);
					let ns  = qnamespace;
					if (tnsname.length>1) {
						ns = "'"+tnsname[0]+"'"
						if (tnsname.length>2) {
							dname = tnsname[1];
							name = name.substring(tnsname[0].length+tnsname[1].length+2)
							gname = name;	
						} else {
							name = name.substring(tnsname[0].length+1)
							dname = name;
							gname = name;	
						}
					}					
					let alreadydeclaredtype = declared[dname];
					let dodeclare = !declared[dname];
					if (alreadydeclaredtype) {
						if (alreadydeclaredtype!=type) {
							console.error(declare,dname,"already defined with another global type")
							letend = "throw '"+dname+" already defined with another global type';"
						} else {
							let o = otype[dname];
							if (o) {
								if (o.ns!=ns) {
									console.error(declare,dname,"already defined with another namespace")
									letend = "throw '"+dname+" already defined with another another namespace';"
								}
							}
						}
					} else {
						declared[dname] = type;
						otype[dname] = {ns}
						if (watched) {
							watchedvars[dname] = type;
							haswatchedvars = true;
						}
					}
					if (dodeclare) {
						letstart += dname;
						switch (type) {
							case "g":
								letequals += "getGlobalShared" +  letequalsend + "('"+gname+"');";
								break;
							case "n":	
								letequals += "getNamespaceShared" +  letequalsend + "('"+gname+"',"+ns+");";
								break;
							case "d":
								if (watched) {
									letequals += "getSetProxy('"+gname+"',{},currentElement);"
								} else {
									letequals = "= {};"
								}
								letequals += "(function() {let anc = "+AObjectName0+".__private.getPvAncGlobals(currentElement); if (anc."+gname+") { "+gname+".parent = anc."+gname+".obj; "+gname+".parentElement = anc."+gname+".elem }; anc."+gname+" = { obj : "+gname+", elem : currentElement } } )();";
								hasancestorglobals = true;
								break;
							case "a": {
								letequals = "="+AObjectName0+".getJSONPath("+AObjectName0+".__private.getPvAncGlobals(currentElement),'" + gname + ".obj');if ("+gname+"===undefined) { "+gname+"={} };"; 
							}
						}
					} else {
						letstart = "";
						letequals = "";
					}
					txt += letstart + letequals + letend;
				
					let letinit = "";
					if (tdeclaration.length>1&&tfullname.length<2) {
						letinit = "throw 'Cannot initialize the base object (i.e. everydeclaration that affects something should have a dot in the variable name)';";
					}
					if (tfullname.length>1) {
						let path = fullname.substring(dname.length+1);
						letinit += AObjectName0 + ".getJSONPath("+dname+",'"+path+"',"+value+","+valueremove+");";
					}
					txt += letinit;
					
				}
				
				match = globalsRE.exec(declareText);
			}
			txt += declareText.substring(lastpos,declareText.length);
			
			declareText = txt;
			txt = "";
			let localsRE = /(^|;|\|\\n})([ \t]*(let|var|const)[ \t]+)*[ \t]*(watched )*[ \t]*(l)ocal([ \t]+)(watched )*[ \t]*((([ \t]*)(([^,;\n$]+)[ \t]*)([ \t]*)(,*))+)/gim; //todo: make a more general/robust parsing that supports comma in strings, and multiline for functions
			match = localsRE.exec(declareText);
			lastpos = 0;
			while (match!= null) {
				txt += declareText.substring(lastpos,match.index);
				lastpos = match.index + match[0].length;
				let watched = (match[4] || match[7])!=undefined;
				watch = watch || watched;
				let type = match[5].charAt(0) //l
				let declarations = match[8];
				let tdeclarations = declarations.split(/,/g);
				let otype = declaredbytype[type] || declaredglobals
				for (let j=0;j<tdeclarations.length;j++) {
					let letstart = match[1] || "";
					letstart += match[2] || "let "
					let letequals = " = A.__private."
					let letend = "";
					let declaration = tdeclarations[j].trim();
					let tdeclaration = declaration.split("=");
					let fullname = tdeclaration[0].trim();
					let value = tdeclaration[1] || "null"
					let tfullname = fullname.split(/\./d);
					let name = tfullname[0];
					let alreadydeclaredtype = declared[name];
					let dodeclare = !declared[name];
					if (alreadydeclaredtype) {
						if (alreadydeclaredtype!=type) {
							console.error(declare,name,"already defined with another global type")
							letend = "throw '"+name+" already defined with another global type';"
						}
					} else {
						declared[name] = type;
						otype[name] = {}
						if (watched) {
							watchedvars[name] = type;
							haswatchedvars = true;
						}
					}
					if (dodeclare) {
						letstart += name;
						switch (type) {
							case "l":
								haslocals = true;
								if (watched) {
									letequals += "getSetProxy('"+name+"',{},currentElement);"
								} else {
									letequals = "= {};"
								}
								letequals += "(function() {let locs = "+AObjectName0+".__private.getPvLocals(currentElement); locs."+name+" = { obj : "+name+", elem : currentElement } } )();";
								break;
						}
					} else {
						letstart = "";
						letequals = "";
					}
					txt += letstart + letequals + letend;
				
					let letinit = "";
					if (tdeclaration.length>1&&tfullname.length<2) {
						letinit = "throw 'Cannot initialize the base object (i.e. everydeclaration that affects something should have a dot in the variable name)';";
					}
					if (tfullname.length>1) {
						let path = fullname.substring(name.length+1);
						letinit += AObjectName0 + ".getJSONPath("+name+",'"+path+"',"+value+");";
					}
					txt += letinit;
					
				}
				
				match = localsRE.exec(declareText);
			}
			txt += declareText.substring(lastpos,declareText.length);
			
			if (hasancestorglobals) {
				txt += "currentElement.classList.add("+AObjectName0+"._rndAElementHasAncestorGlobalsClass);";;
			}
			if (haslocals) {
				txt += "currentElement.classList.add("+AObjectName0+"._rndAElementHasLocalsClass);";;
			}
				
			if (haswatchedvars) {
				txt += "(function(){" + strGetGetProxy + ";"
				txt += "let __aw = " +AObjectName0+".__private.getAWatchedVars(currentScript);let __awo;"
				for (let key in watchedvars) {
					txt += "__awo = { obj : "+key+" };"
					let type = watchedvars[key]
					let pref = "";
					if (type=="n"&&namespace) {
						pref = namespace + " ";
					}
					let evtobj = "document";
					if (type=="d") {
						evtobj = "currentElement";
					}
					if (type=="l") {
						evtobj = "currentElement";
					}
					if (type=="a") {
						evtobj = AObjectName0+".getJSONPath("+AObjectName0+".__private.getPvAncGlobals(currentElement),'" + key + ".elem')";
					}
					txt += key + "=getGetProxy('"+pref+key+"',"+key+","+evtobj+");__awo.proxy = " + key +";__aw.set("+key+",__awo);"
				}
				txt += "})()"
			}
			
			declare.outerHTML = txt;
		}
		return {watch, declaredbytype}
	}

	function warnTplLiteralPossiblePb(element,child) {
			let pn = child.previousSibling;
			let nn = child.nextSibling;
			console.warn(element,child,"Warning: unparsed node. Any a-xxx HTML tag is usually sourrounded by parenthesis (simple, or double to allow HTML in content) to have A parse it. Like (TAG) / ((TAG)) or {(TAG)} / {(TAG))} for directly appending to " + AKeywords0.currentElement)
			console.warn(getOuter(pn).txt  + "\n******POSSIBLE PROBLEM NODE HERE AFTER *******\n" + getOuter(child).txt + "\n******END POSSIBLE PROBLEM NODE *******\n" + getOuter(nn).txt )
			console.log(element)		
	}

	function resolveChildrenAsTemplateLiterals(element,watched) {
		let fullandwatched = false||watched;
		for (let i= element.children.length-1;i>=0;i--) {
			let child = element.children[i]
			if (child.tagName=="SCRIPT"&&unparsedScriptTypeValue[child.getAttribute("type")]) {
					continue;
			}
			let reTagName = /^[\w-]+$/
			if (!reTagName.test(child.tagName)) {
				if (!child.tagName.startsWith("A:")) {
					console.warn(element,child,"Warning: Oddly named tag found. You may have written script that is missing a space between you < (less than) and the following character, or have forgottent to protect the line(s) with an unparse script tag")
					console.log(element)
				}
			}
			let pn = child.previousSibling;
			let nn = child.nextSibling;
			if (pn==null||nn==null) {
				warnTplLiteralPossiblePb(element,child)
				continue;
			}
			let allowhtml = false;
			let directwrite = false;
			let returnmode = false;
			let cut = 0;
			if (pn.nodeType==Node.TEXT_NODE&&nn.nodeType==Node.TEXT_NODE) {
				if (pn.textContent.endsWith("(=")&&nn.textContent.startsWith(")")) {
					returnmode = true;
					pn.textContent = pn.textContent.substring(0,pn.textContent.length-1);
				}
				if (pn.textContent.endsWith("(")&&nn.textContent.startsWith(")")) {
					cut = 1;
					if (pn.textContent.endsWith("{(")&&nn.textContent.startsWith(")}")) {
						directwrite = true;
						cut = 2
					} else {
						if (pn.textContent.endsWith("((")&&nn.textContent.startsWith("))")) {
							cut = 2
							allowhtml = true;
							if (pn.textContent.endsWith("{((")&&nn.textContent.startsWith("))}")) {
								cut = 3;
								directwrite = true;
							}
						}
					}
					let addlines = "";
					if (addSourceMaps) {
						let nbCurLines = child.outerHTML.split(/\n/g).length
						for (let i=1;i<nbCurLines;i++) {
							addlines += "\n";
						}
					}
					let TLFC = getTemplateLiteralFullCreation(child,fullandwatched,allowhtml)
					if (directwrite) {
						if (returnmode) {
							if (cut) {
								pn.textContent = pn.textContent.substring(0,pn.textContent.length-cut);
								nn.textContent = nn.textContent.substring(cut,nn.textContent.length);
							}
							child.outerHTML = "(function(){"+addlines+"let e = " + TLFC +";if (e.parentElement==null) {"+AKeywords0.currentElement + ".appendChild(e)};return e;})()";
						} else {
							//child.outerHTML = addlines + AKeywords0.currentElement + ".appendChild(" + TLFC +")";
							child.outerHTML = "(function(){"+addlines+"let e = " + TLFC +";if (e.parentElement==null) {"+AKeywords0.currentElement + ".appendChild(e)};return e;})()";
						}
					} else {
						child.outerHTML = TLFC + addlines
					}
				} else {
					warnTplLiteralPossiblePb(element,child)
				}
			} else {
				warnTplLiteralPossiblePb(element,child)
			}
		}
	}
	
	function importIn(elem,url,type,onloaded,removeAfterImport) {
		let args = extractArgumentsByType(arguments)
		elem = args.object[0];url = args.string[0];type = args.string[1];onloaded=args.function[0];removeAfterImport=args.boolean[0];
		let mem = args.boolean[1];
		if (!(elem instanceof HTMLElement)) {
			if (removeAfterImport==undefined) removeAfterImport = true;
			let elems = doc.querySelectorAll("aimporttarget")
			for (let el of elems) {
				if (el.innerHTML.trim().length==0) {
					elem = el;
					el.innerHTML="";
					delete el.A;
					break;
				}
			}
			if (!(elem instanceof HTMLElement)) {
				elem =  document.createElement("aimporttarget")
				elem.style.display = "none"
				doc.body.appendChild(elem);
			}
			(function() {
				let lol = onloaded;
				let le = elem;
				function rem(elem) {
					if (typeof(lol)=='function') { lol.apply(this,arguments) }
					setTimeout(function() {
							if (le.childNodes.length==0) {
								le.remove()
							}
						},100);
				}
				onloaded = rem;
			})();
		}
		let closure = document.createElement(ACustomElements0.AClosure)
		let imp = document.createElement(AElements0.import)
		imp.setAttribute("src",url);
		if (type==undefined) type = "text/html"
		imp.setAttribute("type",type)
		if (removeAfterImport||mem) {
			imp.setAttribute("mem","");
		}
		closure.appendChild(imp)
		elem.insertBefore(closure,elem.firstChild);
		if (removeAfterImport) {
			initialized().then(() => {
				return waitUntilAParsedIfExists(closure).then(() => { let ai = getAImported(closure);let pv = getPrivate(closure);pv.__script?.remove();closure.remove(); if (typeof(onloaded)=='function') onloaded(elem,url,type,ai,removeAfterImport); })
			})
		} else {
			if (onloaded) {
				return waitUntilAParsedIfExists(closure).then(() => { if (typeof(onloaded)=='function') onloaded(elem,url,type,removeAfterImport); })
			}
		}
	}
	A.importIn = importIn;

	var elementImportSelector;
	function rebaseimports(node,prefsrc) {
		if (prefsrc==undefined) {
			prefsrc = "";
		}
		if (elementImportSelector == undefined) elementImportSelector =  makeQuerySelectorForKeyWord(AElements.import);
		let allimports = node.querySelectorAll(elementImportSelector);
		for (let i=0;i<allimports.length;i++) {
			let limport = allimports[i];
			let src = getAttributeValue(limport,"src");
			if (src!=null&&!src.startsWith("/")&&!src.startsWith("\\")) {
				limport.setAttribute("src",prefsrc+src);
			}
		}
	}


	function parseAInnerTags(element,forcedATarget,watchchildren,srcbase,opts) {
		if (!opts) opts = {}
		if (elementImportSelector == undefined) elementImportSelector =  makeQuerySelectorForKeyWord(AElements.import);
		let ATarget = forcedATarget || getAElementTarget(element)
		let allimports = element.querySelectorAll(elementImportSelector);
		let promises = [];
		let bwatch = false || watchchildren;
		resolveGlobalRunFirst(element,bwatch)
		
		let pimp = new Promise((resolve,reject) => {
			function recurseAllImport() {
				let allimports = element.querySelectorAll(elementImportSelector);
				for (let i=0;i<allimports.length;i++) {
					(function(){
						let limport = allimports[i];
						let lATarget = ATarget;
						let lsrcbase = srcbase;
						if (!limport._Aparsed ){
							limport._Aparsed = true;
							let type = getAttributeValueLC(limport,"type");
							let src = getAttributeValue(limport,"src");
							let mem = getAttributeValue(limport,"mem")!=null || opts.tagDef;
							let promise = extFetch(src).then(resp => { 
									if (resp.ok) { 
										return resp.text();
									} else {
										return Promise.reject(resp.status);
									}
							}).then((txt) => {
								let aimp;
								if (mem) aimp = getAImported(element);
								let newsrcbase = lsrcbase;
								if (src) {
									let pls = src.lastIndexOf("/")
									if (pls>=0) {
										let tmp = src.substring(0,pls+1)
										if (newsrcbase) {
											newsrcbase = tmp + newsrcbase;
										} else {
											newsrcbase = tmp;
										}
									}
								}
								if (APostImportFetchJobs.length>0) {
									for (let j=0;j<APostImportFetchJobs.length;j++) {
										let job = APostImportFetchJobs[j]
										if (job) {
											let call = job.function
											if (typeof(job)=='function') {
												job = {function: job}
												call = job;
											}
											if (typeof(call)=='function') {
												let res = call.apply(limport,[txt])
												if (typeof(res)=='string') {
													txt = res;
												}
												if (typeof(res)=='object') {
													if (res.txt) txt = res.txt;
												}
											}
										}
									}
								}
								if (type==null||type.indexOf("javascript")>=0||type.indexOf("json")>=0) {
									let closure = getAttributeValueLC(limport,"closure");
									closure = closure != null && closure != "false";
									if (aimp) aimp.scripts.push(src);
									if (closure) {
										txt = "(function(){" + txt + "})()";
									}
									if (txt!=undefined) {
										let node = doc.createElement("span");
										node.innerHTML = txt;
										rebaseimports(node,newsrcbase)
										limport.outerHTML="/*imported "+src+"*/\n" + txt + "\n/*end imported "+src+"*/";
									} else {
										limport.outerHTML="";
									}
								} else {
									if (txt!=undefined) {
										if (type.indexOf("css")>=0) {
											let closure = getAttributeValueLC(limport,"closure");
											closure =  closure==null || closure != "false";
											var style = document.createElement("style")
											let limportinnerHTML = limport.innerHTML;
											if (limportinnerHTML.trim().length>0) {
												limportinnerHTML = "\n" + limportinnerHTML;
											}
											txt += limportinnerHTML;
											let _Astyle;
											if (closure) {
												_Astyle = "AStyle" + (AStyleClassCounter++);
												if (!opts.tagDef) lATarget.classList.add(_Astyle);
												txt = "." + _Astyle + "{\n" + txt + "\n}";
											}
											style.classList.add(A._rndAClass);
											style.innerHTML = txt;
											if (aimp) aimp.css.push({ src : src, obj: style, cls : _Astyle });
											lATarget.parentElement.insertBefore(style,lATarget);
										} else {
											let limportinnerHTML = limport.innerHTML;
											if (limportinnerHTML.trim().length>0) {
												limportinnerHTML = "\n" + limportinnerHTML;
											}
											let node = doc.createElement("span");
											node.innerHTML = txt + limportinnerHTML;
											rebaseimports(node,newsrcbase)
											let nodes = [];
											if (!opts.tagDef) {
												while (node.childNodes.length>0) {
													let child = node.childNodes[0]
													nodes.push(child);
													ATarget.appendChild(child);
												}
											} else {
												for (let i=0;i<node.childNodes.length;i++) {
													nodes.push(node.childNodes[i])
												}
											}
											if (aimp) aimp.html.push({ src, nodes });
										}
									}
									limport.outerHTML="";
								}	
								allimports = element.querySelectorAll(elementImportSelector)
								if (allimports.length==0) {
									resolve();
								} else {
									recurseAllImport();
								}			
							}).catch(err => { console.error(err); if (limport.parentElement) limport.outerHTML="" });
						}
					})();
				}
				allimports = element.querySelectorAll(elementImportSelector)
				if (allimports.length==0) resolve();
			}
			recurseAllImport();
		})
		promises.push(pimp);
		let promise = (function() {
			let lbwatch = bwatch;
			let lATarget = ATarget; 
			let lelement = element;
			let promise = Promise.all(promises).then(res => {
				if (addSourceMaps) {
					let srcmap = {"version":3,"sources":[".a-closure"],"names":[],"mappings":"AAAA","file":"src.js","sourcesContent":[]}
					let srccontent = getSourceContent(lelement);
					let lines = srccontent.txt.split(/\n/g);
					let mappings = "AAAA";
					for (let i=1;i<lines.length;i++) {
						mappings += ";AACA"; //line numbers are kept
					}
					srcmap.mappings = mappings;
					srcmap.sourcesContent.push(srccontent.txt);
					getPrivate(lelement).__sourcemap = srcmap
					
				}
				let decls = resolveLetDeclarations(element,lbwatch);
				lbwatch = decls.watch || lbwatch;
				resolveAInnerTagsJobs(element,lbwatch)
				resolveGlobalRunFirst(element,lbwatch)
				resolveForEachOf(element,lbwatch)
				resolveChildrenAsTemplateLiterals(element,lbwatch) 
				if (decls.declaredbytype&&Object.keys(decls.declaredbytype.a).length>0) {
					return makeWaitForParentAScriptsExecutionPromise(lATarget,decls);
				} else {
					return decls;
				}
			})
			return promise;
		})()
		
		
		return { promise };
	} 
	
	function resolveAInnerTagsJobs(element,bwatch) {
		for (let i=0;i<AInnerTagsJobs.length;i++) {
			let job = AInnerTagsJobs[i];
			if (!job.selector||typeof(job.function)!="function") {
				console.error("Invalid tag parsing configuration ",job);
				continue;
			}
			let bthrowAnyway = false;
			try {
				let tags = element.querySelectorAll(job.selector);
				for (let j=0;j<tags.length;j++) {
					let tag = tags[j]
					let tagClone;
					if (AInnerTagsJobsCloneNode) {
						tagClone = tag.cloneNode(true);
					} else {
						tagClone = tag;
					}
					let newText = job.function(tagClone,bwatch);
					if (typeof(newText)=="object") {
						newText = newText.txt || newText.text;
					}
					if (newText==undefined) {
						console.error("Invalid tag parsing for configuration ",job," and tag ",tagClone);
						continue;
					}	
					if (addSourceMaps) {
						let curText = tag.outerHTML;	
						let curNbLines = curText.split(/\n/g).length
						let newNbLines = newText.split(/\n/g).length
						if (curNbLines!=newNbLines) {
							bthrowAnyway = true;
							console.error("Invalid tag parsing for configuration " + JSON.stringify(job) + ": with source maps enabled, it's absolutely required that the text be replaced with the exact same number of lines, and each new line corresponding to the same line in the source. You can bypass that by disabling source maps, but it's not a recommanded workaround. \nThe text is:\n"+newText);
							throw "Invalid tag parsing for configuration " + JSON.stringify(job) + ": invalid replacement";
						}
						tag.outerHTML = newText;
					} else {
						tag.outerHTML = newText;
					}			
				}
			} catch (e) {
				console.error("Invalid tag parsing for configuration " + JSON.stringify(job));
				console.error(e);
				if (bthrowAnyway) throw e;
			}
		}
	}
	
	function makeWaitForParentAScriptsExecutionPromise(lATarget,resolveresult) {
		return new Promise((resolve, reject) => {
			function delayUntilParentAScriptsExecuted(count,stilltoexecute) {
				if (count>10000) {
					reject();
				}	
				let element = lATarget;
				let notExecutedYet = [];
				while (element.parentElement!=null) {
					element = element.parentElement;
					if (element.classList.contains(A._rndANotParsedClass)) {
						notExecutedYet.push(element)
					}
					let ancg = getPvAncGlobalsIfExists(element);
					if (ancg!=null) {
						updatePvAncGlobals(lATarget,ancg);
					} 
				}
				if (notExecutedYet.length>0) {
					if (stilltoexecute.length==notExecutedYet.length&&stilltoexecute[0]==notExecutedYet[0]&&stilltoexecute[stilltoexecute.length-1]==notExecutedYet[notExecutedYet.length-1]) {
						count++;
					}
					setTimeout(function(){ delayUntilParentAScriptsExecuted(count,notExecutedYet) },0)
				} else {
					resolve(resolveresult)
				}
			}	
			delayUntilParentAScriptsExecuted(0,[]);			  
		});
	}
	
	function getTextContent(htmlAElement) {
		let txt = "";
		for (const child of htmlAElement.childNodes) {
			if (child.nodeType === Node.ELEMENT_NODE) {
				if (child.tagName=="SCRIPT"&&unparsedScriptTypeValue[child.getAttribute("type")]) {
					txt += child.innerHTML;
				} else {
		      		txt += child.outerHTML;
		      	}
		    } else if (child.nodeType === Node.TEXT_NODE || child.nodeType === Node.CDATA_SECTION_NODE) {
				txt += child.textContent;
		    }
		}
		return {txt};
	}
	A.getTextContent = getTextContent;
	
	function getNonATextContent(htmlAElement) {
		let txt = "";
		for (const child of htmlAElement.childNodes) {
			if (child.nodeType === Node.ELEMENT_NODE) {
				if (child.classList.contains(A._rndAClass)) continue;
				if (child.tagName=="SCRIPT"&&unparsedScriptTypeValue[child.getAttribute("type")]) {
					txt += child.innerHTML;
				} else {
		      		txt += child.outerHTML;
		      	}
		    } else if (child.nodeType === Node.TEXT_NODE || child.nodeType === Node.CDATA_SECTION_NODE) {
				txt += child.textContent;
		    }
		}
		return {txt};
	}
	A.getNonATextContent = getNonATextContent;
	
	function removeNonATextContent(htmlAElement) {
		for (let j=htmlAElement.childNodes.length-1;j>=0;j--) {
			let child = htmlAElement.childNodes[j];
			if (child.nodeType === Node.ELEMENT_NODE) {
				if (child.classList.contains(A._rndAClass)) continue;
				child.remove();
		    } else if (child.nodeType === Node.TEXT_NODE || child.nodeType === Node.CDATA_SECTION_NODE) {
				child.remove();
		    }
		}
	}
	A.removeNonATextContent = removeNonATextContent;
	
	function removeContent(htmlAElement) {
		for (let j=htmlAElement.childNodes.length-1;j>=0;j--) {
			let child = htmlAElement.childNodes[j];
			child.remove();
		}
	}
	A.removeContent = removeContent;
	
	function getSourceContent(htmlAElement) {
		let txt = "";
		if (htmlAElement&&htmlAElement.childNodes) {
			for (const child of htmlAElement.childNodes) {
				if (child.nodeType === Node.ELEMENT_NODE) {				
			      	txt += child.outerHTML;
			    } else if (child.nodeType === Node.TEXT_NODE || child.nodeType === Node.CDATA_SECTION_NODE) {
					txt += child.textContent;
			    }
			}
		}
		return {txt};
	}
	A.getSourceContent = getSourceContent
	
	function getOuter(elem) {
		let txt = "";
		if (elem) {
			if (elem.nodeType === Node.ELEMENT_NODE) {				
		      	txt += elem.outerHTML;
		    } else if (elem.nodeType === Node.TEXT_NODE || elem.nodeType === Node.CDATA_SECTION_NODE) {
				txt += elem.textContent;
		    }
		}
		return {txt};
	}

	let getABaseElementsIgnoreAttributes = {
		"closure" : true
	}

	function getGetProxy(evtNamePrefix,obj,target) {
		let res = obj;
		(function(){
			let name = evtNamePrefix;
			let oobj = obj;
			let evtobj = target || document;
			let handler = {
				get(obj, prop, value,receiver) {
					if (typeof(prop)=="symbol") {
						return oobj.toString;
					}
					__privateWatchedInfos[name+'.'+prop] = { evtobj };
					let res = Reflect.get(obj, prop, value,receiver);					
					if (typeof(res)=='object'&&res!=null) {
						res = getGetProxy(name + "." + prop,res,evtobj)
					}	
					return res;
				}
			};
			res = new Proxy(res,handler);
		})();
		return res;
	}
	var strGetGetProxy = getGetProxy.toString().replace(/__privateWatchedInfos/g,__privateWatchedInfosName).replace(/[\n\r]/g,"").replace(/([\t]|\s+)/g," ").replace(/;+/g,";");
	
	function extractArgumentsByType(args) {
		let res = { "undefined" : [], "null" : [], "boolean" : [], "number" :[], "bigint" : [], "string" : [], "symbol" : [], "function" : [], "object" : []}
		for (let arg of args) {
			if (arg==null) {
				res[null].push(arg)
			} else {
				res[typeof(arg)].push(arg)
			}
		}
		return res;
	}
	A.extractArgumentsByType = extractArgumentsByType;
	
	function watch(f) {
		let oargs = A.extractArgumentsByType(arguments);
		let addevent = oargs.boolean[0];
		let onok = oargs.function[1];
		let onko = oargs.function[2];
		let __privateWatchedInfosmem = __privateWatchedInfos;
		__privateWatchedInfos = {};
		let evtchangefs = f.evtchangefs || {}; 
		if (addevent===false) {
			evtchangefs = {};
		}
		let retval = { suspend : false };
		let result;
		try {
			result = f(retval);
			if (onok) onok(result,retval);
		} catch(e) {
			if (onko) {
				onok(e);
			} else{
				throw e;
			}
		} 
		retval.result = result;
		let ce = currentElement;
		let aw = window[_defaultAObjectName].__private.getAWatched(ce);
		let lastrunspdde;
		for (let key in __privateWatchedInfos) { 
			(function() {
				let lce = ce;
				let okrun = true; 
				let evtf = function() { 
					if (retval.suspend==true) return;
					if (okrun) { 
						if (lastrunspdde!=undefined&&lastrunspdde==A.__private.__spdddeobj) {
							return;
						} else {
							lastrunspdde=A.__private.__spdddeobj;
						}
						okrun = false; 
						let __privateWatchedInfosmem = __privateWatchedInfos;
						__privateWatchedInfos = {};  
						try {
							retval.result = f(retval); 
							if (onok) onok(retval.result,retval);
						} catch(e) {
							if (onko) {
								onko(e,retval);
							} else{
								throw e;
							}
							okrun = true;
						} 
						for (let key in __privateWatchedInfos) { 
							if (!evtchangefs[key]) { 
								if (addevent!==false) __privateWatchedInfos[key].evtobj.addEventListener(key + ' change',evtf); 
								evtchangefs[key] = {evtf : evtf, obj :  __privateWatchedInfos[key].evtobj} 
							} 
						} 
						__privateWatchedInfos = __privateWatchedInfosmem;
						;okrun = true 
					}
					if (lce.parentElement==null&&addevent!==false) {
						setTimeout(function() {
							if (lce.parentElement==null) {
								__privateWatchedInfos[key].evtobj.removeEventListener(key + ' change',evtf);
								delete evtchangefs[key];
							}
						},watchCleanEventDelay)
					} 
				};
				if (!evtchangefs[key]) {
					if (addevent!==false)__privateWatchedInfos[key].evtobj.addEventListener(key + ' change',evtf); 
					evtchangefs[key] = {evtf : evtf, obj :  __privateWatchedInfos[key].evtobj}
				}
			} )() 
		}; 
		__privateWatchedInfos = __privateWatchedInfosmem;
		if (addevent!==false) {
			f.evtchangefs = evtchangefs; 
			aw.push(f);
		}
		retval.evtchangefs = evtchangefs;
		return retval; 
	};
	var watchBody = getFunctionBody(watch).replace(/A\./g,AObjectName0 + ".").replace(/watchCleanEventDelay/g,watchCleanEventDelay).replace(/__privateWatchedInfos/g,__privateWatchedInfosName).replace(/\n|\r/g,"").replace(/([\t]|\s+)/g," ").replace(/;+/g,";");
	
	function copyHTMLandCSSMemImports(src,target) {
		let mem = getAImported(src);
		for (let o of mem.css) {
			target.classList.add(o.cls);
		}
		for (let o of mem.html) {
			for (let n of o.nodes) {
				target.appendChild(n.cloneNode(true));	
			}
		}
	}
	A.copyHTMLandCSSMemImports = copyHTMLandCSSMemImports;
	
	function getABaseElements(htmlAElement,addclass,addclosure,options) {
		let AText = getTextContent(htmlAElement).txt;
		let script = doc.createElement("script");
		script.classList.add(A._rndAClass);
		htmlAElement.classList.add(A._rndAClass);
		let scriptAId = addGlobalObject(script);
		let thisAId = addGlobalObject(htmlAElement);
		if (htmlAElement.getAttribute("async")==null) {
			script.async = false;
		}
		let ATarget = getAElementTarget(htmlAElement)
		ATarget.remove = (function() {let oremove = ATarget.remove; return  function remove() { this.remove = oremove; deleteGlobalObject(this);}})()
		let pv = getPrivate(htmlAElement);
		if (!pv.__ascriptadded) {
			getAScripts(ATarget).push(htmlAElement);
			pv.__ascriptadded = true;
		}
		
		pv.__ATarget = ATarget;
		pv.__script = script;
		getPrivate(script).__source = htmlAElement;
		script.__AGOOrphansIgnore = true;
		
		if (addclass||addclass==undefined) ATarget.classList.add(A._rndAElementClass);
		let ATargetAId = addGlobalObject(ATarget);
		for (let i=0;i<htmlAElement.attributes.length;i++) {
			let name = htmlAElement.attributes[i].name;
			if (!getABaseElementsIgnoreAttributes[name.toLowerCase()]) {
				script.setAttribute(name,htmlAElement.getAttribute(name))
			}
		}
		script.classList.remove(A._rndANotParsedClass);
		let closure = getAttributeValueLC(htmlAElement,"closure");
		if (closure!=null) {
			if (addclosure===undefined) {
				addclosure = closure!="false"
			} else {
				if (addclosure===false) {
					addclosure = closure=="true"
				} else {
					if (addclosure===true) {
						addclosure = !(closure=="false")
					}
				}
			}
		}
		let namespace = getAttributeValue(htmlAElement,"namespace");
		let scriptTextStart = ""+AObjectName0+".__private.getGlobalObject("+thisAId+").classList.add('"+A._rndAParsedClass+"');"+AObjectName0+".__private.getGlobalObject("+thisAId+").classList.remove('"+A._rndANotParsedClass+"');";
		let defkw = "var";
		
		let scriptTextEnd = "";
		if (addclosure) {
			defkw = "let";
			scriptTextStart += "("+AObjectName0+".__private.getPrivate("+AObjectName0+".__private.getGlobalObject("+scriptAId+")).__closureFct = function(){"
			scriptTextEnd += ";})()";
		}
		
		let watchNotWatched = "function watch(f) {f();};function unwatch(obj) {return obj}" 
		let watchWatched = "let "+__privateWatchedInfosName+" = {};function watch(f) "+watchBody+";function unwatch(obj) {let aw = " +AObjectName0+".__private.getAWatchedVars(currentScript); let awo = aw.get(obj);if (awo) obj = awo.obj; return obj}" 
		let namespaceAStore = AKeywords0.AStore;

		
		scriptTextStart += defkw +" " + AKeywords0.currentScript + " = "+AObjectName0+".__private.getGlobalObject("+scriptAId+");"+ defkw +" " + AKeywords0.currentElement + " = "+AObjectName0+".__private.getGlobalObject("+ATargetAId+");" + defkw +" " + AKeywords0.AStore + " = " + AKeywords0.currentElement + "."+AObjectName0+"; if (" + AKeywords0.AStore + "==undefined) { " + AKeywords0.AStore + " = { __private : { __ascripts : []}};"+AObjectName0+".forEachKeyWord("+AObjectName0+".AObjectNames,name=>{ " + AKeywords0.currentElement + "[name] = " + AKeywords0.AStore + " }) };"
		if (options) {
			if (options.tagDef) {
				scriptTextStart += AObjectName0+".__private.getPrivate(" + AKeywords0.currentScript + ").__tagDefFct = function ("+AKeywords0.currentScript+","+AKeywords0.currentElement+","+AKeywords0.AStore+") {"
				   + AObjectName0+".copyHTMLandCSSMemImports("+AObjectName0+".__private.getGlobalObject("+thisAId+"),currentElement);"
				scriptTextEnd = ";};"+ AObjectName0+".__private.generateTagDef("+thisAId+"," + AKeywords0.currentScript + ","+scriptAId+"," + AKeywords0.currentElement + ","+ATargetAId+");" + scriptTextEnd;
			}
		}
		scriptTextStart += AKeywords0.currentElement + ".classList.remove('"+A._rndANotParsedClass+"');"
		if (namespace!=null&&namespace.length>0) {
			namespaceAStore = namespace;
			scriptTextStart += defkw + " " + namespaceAStore + " = " + AKeywords0.currentElement + "."+namespaceAStore+"; if (" + namespaceAStore + "==undefined) { " +namespaceAStore + " = { __private : { __ascripts : [] }}; " + AKeywords0.currentElement + "."+namespaceAStore+" = "+namespaceAStore+"};"
		}
		scriptTextStart += "function " + AFunctions0.expose + "(arg1,arg2) { let exposeAStore = " + namespaceAStore + ";" + A.__private.exposeBody  + " };"+AObjectName0+".forEachKeyWord("+AObjectName0+".AFunctions.expose,name=>{AStore[name] = " + AFunctions0.expose + " });"
		scriptTextStart += "function " + AFunctions0.injectFunction + "(f,bexpose,exposename) { let injectFunctionAStore = bexpose===false ? null : " + namespaceAStore + ";" + A.__private.injectFunctionBody  + " };"+AObjectName0+".forEachKeyWord("+AObjectName0+".AFunctions.injectFunction,name=>{AStore[name] = " + AFunctions0.injectFunction + " });"
		return {script, scriptAId, ATargetAId, AText, scriptTextStart, watchNotWatched, watchWatched , scriptTextEnd, ATarget, namespace}
	} 

	var tagDefsFctsByTagName = {}
	var tagDefsFctsByAttrName = {}
	function generateTagDef(ascriptAId,script,scriptAId,elementTarget,elementTargetAId) {
		let ascript = getGlobalObject(ascriptAId);
		let fortag = getAAttribute(ascript,AAttributes.forTag);
		let forattr = getAAttribute(ascript,AAttributes.forAttribute)
		if (forattr) {
			foattr = forattr.toLowerCase();
			let tforattr = forattr.split(/,/g);
			forEachKeyWord(tforattr,function(kw) {
				tagDefsFctsByAttrName[kw] = {scriptAId, ascriptAId, elementTargetAId}
				requestAnimationFrame(() => { 
					executeAllUndoneClosureAttributes(kw);
				});
			})
		}
		if (fortag) {
			fortag = fortag.toLowerCase()
			let tfortag = fortag.split(/,/g);
			let attachInternals = getAAttribute(ascript,AAttributes.attachInternals);
			if (attachInternals!=null&&attachInternals!="false") {
				attachInternals = true;
			} else {
				attachInternals = false;
			}
			let gobservedAttributes =[];
			let aobservedAttributes = getAAttribute(ascript,AAttributes.observedAttributes);
			if (aobservedAttributes&&aobservedAttributes.length>0) {
				gobservedAttributes = aobservedAttributes.split(/,/g)
			}
			waitUntilAParsedIfExists(ascript).then(function() {
					forEachKeyWord(tfortag,function(kw) {
						if (!tagDefsFctsByTagName[kw]) {
							let observedAttributes = JSON.parse(JSON.stringify(gobservedAttributes));
							let customTagOptions = {scriptAId, ascriptAId, elementTargetAId, attachInternals, observedAttributes };
							tagDefsFctsByTagName[kw] = customTagOptions;
							customElements.define(kw,class extends MyACustomTag{ 
								static observedAttributes = customTagOptions.observedAttributes
								constructor() { 
									super();
									this.customTagOptions = customTagOptions; 
									if (customTagOptions.attachInternals) { this.internals_ = this.attachInternals(); } 
								}
								attributeChangedCallback(name, oldValue, newValue) {
								    if (typeof(this["on" + name + "AttributeChanged"])=="function") {
										this["on" + name + "AttributeChanged"](oldValue,newValue);
									}
								    if (typeof(this["onAttributeChanged"])=="function") {
										this["onAttributeChanged"](name,oldValue,newValue);
									}
								}
							});
						} else {
							tagDefsFctsByTagName[kw].scriptAId = scriptAId
							tagDefsFctsByTagName[kw].ascriptAId = ascriptAId
							tagDefsFctsByTagName[kw].elementTargetAId = elementTargetAId
							tagDefsFctsByTagName[kw].attachInternals = attachInternals
							tagDefsFctsByTagName[kw].observedAttributes.length=0;
							for (let i=0;i<gobservedAttributes.length;i++) {
								tagDefsFctsByTagName[kw].observedAttributes.push(gobservedAttributes[i])
							}
						}
					})
				})
		}
		
	}
	A.__private.generateTagDef = generateTagDef;

	function executeAllUndoneClosureAttributes(attrName) {
		let candidatesSelector = makeQuerySelectorForKeyWord(ACustomElements0.AClosure,"["+attrName+"]");
		let candidates = doc.querySelectorAll(candidatesSelector);
		for (let i=0;i<candidates.length;i++) {
			let candidate = candidates[i];
			executeUndoneClosureAttributes(candidate);
		}
	}

	function executeUndoneClosureAttributes(element) {
		let ATarget = getAElementTarget(element)
		let AAppliedTags = getAAppliedTags(ATarget);
		let attrsToRemove = [];
		let AText = "";
		for (let i=0;i<element.attributes.length;i++) {
			let name = element.attributes[i].name;
			let infos = tagDefsFctsByAttrName[name];
			if (infos) {
				attrsToRemove.push(name);
				if (AAppliedTags[name]) {
					continue;
				}
				AAppliedTags[name] = true;
				AText += AObjectName0 + ".__private.getPrivate("+AObjectName0 + ".__private.getGlobalObject("+infos.scriptAId+")).__tagDefFct("+AKeywords0.currentScript+","+AKeywords0.currentElement+","+AKeywords0.AStore+");"
			}
		}
		for (let i=0;i<attrsToRemove.length;i++) {
			element.removeAttribute(attrsToRemove[i]);
		}
		let closure = doc.createElement(ACustomElements0.AClosure);
		closure.innerHTML = AText;
		if (element.parentElement) {
			element.parentElement.insertBefore(closure,element);
		}
	}

	function appendElement() {
		let ignore = {tagName : true, content : true}
		let elem,elem2;
		let decl;
		for (let arg of arguments) {
			if (arg instanceof HTMLElement) {
				if (!elem) {
					elem = arg;
				} else {
					if (!elem2) elem2 = arg;
				}
			} else {
				if (arg instanceof Node) {
					if (!elem2) elem2 = arg;
				} else {
					if (typeof(arg)=="object"&&arg.tagName) {
						decl =arg;
					}
				}
			}
		}
		if (!decl) return;
		if (!elem) elem = document.body;
		let tagName = decl.tagName;
		let el = document.createElement(tagName)
		let c = decl.content;
		if (c) {
			el.innerHTML = c;
		}
		for (let key in decl) {
			if (ignore[key]) continue;
			el.setAttribute(key,decl[key])
		}
		if (elem2) {
			elem.insertBefore(el,elem2);
		} else {
			elem.appendChild(el);
		}
	}
	A.appendElement = appendElement;
	
	function tagDef(def) {
		def.tagName = "a-tagDef"
		def.redefine = "true"
		appendElement(def)
	}
	A.tagDef = tagDef

	function replayCustomTag(tag) {
		if (!tag instanceof HTMLElement) return;
		let pv = getPrivate(tag)
		if (!pv._isACustomTag) return;
		let nn = pv.__initState || document.createElement(tag.tagName);
		nn[APrivateDataKeyWords._reqaID] = tag[APrivateDataKeyWords._aID]
		let pe = tag.parentElement;
		let ns = tag.nextSibling;
		deleteGlobalObject(tag)
		pe.insertBefore(nn,ns);
	}
	A.replayCustomTag = replayCustomTag;
	
	function replayCustomTagsByName(name) {
		let els = document.querySelectorAll(name)
		for (let el of els) {
			replayCustomTag(el)
		}
	}
	A.replayCustomTagsByName = replayCustomTagsByName;

	function parseACustomTag(tagelement) {
		let opts = tagelement.customTagOptions;
		let closure = doc.createElement(ACustomElements0.AClosure);
		for (let i=0;i<tagelement.attributes.length;i++) {
			let name = tagelement.attributes[i].name;
			closure.setAttribute(name,tagelement.getAttribute(name))
			closure.__addSourceMaps = false;
		}
		if (keepCustomTagsInitState) {
			getPrivate(tagelement).__initState = tagelement.cloneNode(true);
		}
		removeAAttribute(closure,AAttributes.singleton);
		let decls = getPrivate(getGlobalObject(opts.ascriptAId)).decls
		closure.innerHTML = AObjectName0 + ".__private.getPrivate("+AObjectName0 + ".__private.getGlobalObject("+opts.scriptAId+")).__tagDefFct("+AKeywords0.currentScript+","+AKeywords0.currentElement+","+AKeywords0.AStore+");"
		if (decls.declaredbytype&&Object.keys(decls.declaredbytype.a).length>0) {
			//delay
			makeWaitForParentAScriptsExecutionPromise(tagelement,decls).then(res => {
				tagelement.insertBefore(closure,tagelement.firstChild);
			});
		} else {
			tagelement.insertBefore(closure,tagelement.firstChild);
		}
	}

	function waitUntilAParsedIfExists() {
		let fargs = []
		for (let i=0;i<arguments.length;i++) {
			fargs.push(arguments[i]);
		}
		return (function() {
			let args = fargs
			return new Promise((resolve,reject) => {
				if (args.length==0) {
					resolve();
					return;
				}
				function clearParsed(args) {
					do {
						let cur = args[0];
						if (typeof(cur)=="string") {
							if (!args.base) args.base = doc;
							let temp = [];
							try {
								temp = args.base.querySelectorAll(cur)
							} catch (e) {
								args.length = 0;
								reject(e);
								return;
							}
							if (temp.length>0) {
								cur = temp[0]
								for (let i=temp.length-1;i>=1;i--) {
									args.unshift(temp[i])
								}
							} else {
								args.shift();
								continue;								
							}
						}
						if (cur instanceof HTMLElement) {
							if (!cur.classList.contains(A._rndANotParsedClass)||cur.parentElement==null) {
								args.shift();
								args.base = cur;
								continue;
							} else {
								return;
							}
						} else {
							if (typeof(cur)=="object"&&typeof(cur.shift)=='function') {
								if (cur.length>0) {
									if (!cur.base) {
										cur.base = args.base;
									}
									let l = cur.length;
									clearParsed(cur)
									if (cur.length>=l) {
										return;
									}
								} else {
									args.shift();
									continue;
								}
							} else {
								args.length = 0;
								reject(cur)
							}
						}
					} while (args.length>0);
				}
				
				function wait(count,lastargslength) {
					clearParsed(args)
					if (args.length==0) {
						resolve();
						return;
					} else {
						if (args.length==lastargslength) {
							count++;
						}
						if (count<10000) {
							setTimeout(() => { wait(count,args.length)},0);
						} else {
							reject();
						}
					}
				}
				setTimeout(() => { wait(0,args.length)},0);
			})
		})()
	}
	A.waitUntilAParsedIfExists = waitUntilAParsedIfExists;
	
	function addACustomTagFirstConnectedTask(tagName,task) {
		let typeoftask = typeof(task);
		if (typeoftask!="object"&&typeoftask!="function") return;
		tagName = tagName.toUpperCase();
		let tasks = ACustomTagFirstConnectedJobs[tagName]
		if (!tasks) {
			tasks = [];
			ACustomTagFirstConnectedJobs[tagName] = tasks;
		}
		tasks.push(task)
	}
	A.addACustomTagFirstConnectedTask = addACustomTagFirstConnectedTask;
	
	function moveThis(data){  
		let sel = data.selector || data; let base = data.dest || document;
		let dest = base.querySelector(sel)
		if (dest) { 
			 	switch (data.position) {
					 case "start":
						 dest.insertBefore(this,dest.firstChild);
						 break;
					 case "before":
						 dest.parentElement.insertBefore(this,dest);
						 break;
					 case "after":
						 dest.parentElement.insertBefore(this,dest.nextSibling);
						 break;
					 default:
						 dest.appendChild(this);
				 } 
		} 
	}
	
	ConnectedJobsByType.waitFor = {
		call : waitUntilAParsedIfExists,
		args : ["data"]
	}
	ConnectedJobsByType.removeIf = {
		call : (sel) => { if (document.querySelector(sel)) { this.remove(); } },
		args : ["selector"]
	}
	ConnectedJobsByType.moveTo = {
		call : moveThis,
		args : ["data"]
	}
	
	function waitUntilCustomTagTasksExecuted(gAthis,gtasks) {
		if (gtasks&&gtasks.length>0) {
			return (function() {
				let tasks = gtasks;
				let Athis = gAthis;
				return new Promise((resolve,reject) => {
					function unpiletasks(tasks) {
						for (let i=0;i<tasks.length;i++) {
							let task = tasks[i];
							let typeoftask = typeof(task);
							let call,args;
							if (typeoftask=="object") {
								let type = task.type;
								let job = ConnectedJobsByType[type]
								if (job) {
									call = job.call
									if (job.args&&job.args.length>0) {
										args = [];
										for (let j=0;j<job.args.length;j++) {
											let aj = job.args[j];
											let val = task[aj]
											if (typeof(val)=='function') {
												val = val.apply(Athis,task)
											}
											args.push(val);
										}
									}
								}
							}
							if (typeoftask=="function") {
								call = task;
							}
							if (call) {
								try {
									let res  = call.apply(Athis,args)
									tasks.splice(0,i+1);
									if (res instanceof Promise) {
										res.then(() => {
											unpiletasks(tasks);
										})
										return;
									}
								} catch (e) {
									console.error(e);
									reject(e);
								}
							}
						}
						resolve();
					}
					unpiletasks(tasks);
				})
			})()
		} else {
			return false;
		}
	}
	
	function manageWaitFor(AThis) {
		let waitFor = getAAttribute(AThis,AAttributes.waitFor);
			if (waitFor!=null) {
				try {
					waitFor = JSON.parse(waitFor)
					return waitUntilAParsedIfExists(waitFor);
				} catch(e) {
					console.error("error waitFor",e,AThis)
				}
			}
		return Promise.resolve(true);
		
	}
	
	function manageSingleton(AThis) {
		let singleton = getAAttribute(AThis,AAttributes.singleton)
		if (singleton!=null) {
			if (singletonExist(singleton)) {
				let singletonreplace = getAAttribute(AThis,AAttributes.singletonreplace)
				if (singletonreplace!=null&&singletonreplace!="false") {				
					if (singletonreplace=="existing") {
						let existing = singletons.get(singleton);
						let pe = existing.parentElement;
						let insertBefore = existing.nextSibling
						addSingleton(singleton,AThis)
						waitUntilAParsedIfExists(AThis).then(()=> { pe.insertBefore(AThis,insertBefore) })
					} else {
						addSingleton(singleton,AThis)
					}
					return false;
				} else {
					AThis.remove();
				}
				return true;
			} else {
				addSingleton(singleton,AThis);
			}
		}
		return false;
	}

	class MyACustomTag extends HTMLElement {
	
	  constructor() {
	    super();
	  }
	
	  connectedCallback() {		  
		if (this[A._rndAClass]) {
			return;
		}
		let pv = getPrivate(this)
		pv._isACustomTag = true;
		this.classList.add(A._rndANotParsedClass);
		this[A._rndAClass] = true;
		let Athis = this;
		manageWaitFor(Athis).then(() => {
			if (manageSingleton(Athis)) return;
			let tagName = Athis.tagName;
			tagName = tagName.toUpperCase();
			let tasks = ACustomTagFirstConnectedJobs[tagName]
			let wait = false;
			if (tasks) {
				wait = waitUntilCustomTagTasksExecuted(Athis,[...tasks]);
			}
			if (wait) {
				requestAnimationFrame(() => { wait.then(() => {parseACustomTag(Athis)}).catch(() => {parseACustomTag(Athis)}) });
			} else {
		    	requestAnimationFrame(() => { parseACustomTag(Athis)});
		    }
		})
		
	  }
	
	  disconnectedCallback() {
	  }
	
	  adoptedCallback() {
	  }
	
	}
	function bytesToBase64(bytes) {
	  const binString = Array.from(bytes, (byte) =>
	    String.fromCodePoint(byte),
	  ).join("");
	  return btoa(binString);
	}

	let cleanGlobalObjectsOrphansId = -1;
	function parseAScript(element,addclass,addclosure,options) {
		let pe = element.parentElement;
		if (pe==null) return;
		if (pe.classList.contains(A._rndANotParsedClass)||pe.classList.contains(A._rndAParsedClass)) {
			let pv = getPrivate(pe)
			if (!pv._isACustomTag&&!pv._isAElementTarget)	return; //do not parse inside another AElement. This is full literal creation
		}
		element.classList.add(A._rndANotParsedClass);
		if (addclass==undefined) addclass = false;
		if (addclosure==undefined) addclosure = false;
		if (cleanGlobalObjectsOrphansId<0&&AFirstRuntimeCleanDelay>=0&&(Date.now()-AFirstRunTime)>AFirstRuntimeCleanDelay) {
			cleanGlobalObjectsOrphansId = setTimeout(() => { cleanGlobalObjectsOrphans(); cleanGlobalObjectsOrphansId = -1},100);
		}
		(function(){
			let laddclass = addclass;
			let laddclosure = addclosure;
			let loptions = options;
			let lelement = element;
			parseAInnerTags(lelement,null,null,null,options).promise.then(res => {
				let ABE = getABaseElements(lelement,laddclass,laddclosure,loptions)
				let ATarget = ABE.ATarget;
				let AAppliedTags = getAAppliedTags(ATarget);
				let pv = getPrivate(lelement);
				pv.decls = res;
				let AText = ABE.AText, script = ABE.script;
				let scripttext = ABE.scriptTextStart;
				if (res.watch) {
					scripttext += ABE.watchWatched;
				} else {
					scripttext += ABE.watchNotWatched;					
				}
				let bdelay = false;
				let attrsToRemove = [];
				for (let i=0;i<lelement.attributes.length;i++) {
					let name = lelement.attributes[i].name;
					let infos = tagDefsFctsByAttrName[name];
					if (infos) {
						attrsToRemove.push(name);
						if (AAppliedTags[name]) {
							continue;
						}
						let decls = getPrivate(getGlobalObject(infos.ascriptAId)).decls
						if (decls.declaredbytype&&Object.keys(decls.declaredbytype.a).length>0) {
							//delay
							bdelay = true;
						}
						AAppliedTags[name] = true;
						AText += ";" + AObjectName0 + ".__private.getPrivate("+AObjectName0 + ".__private.getGlobalObject("+infos.scriptAId+")).__tagDefFct("+AKeywords0.currentScript+","+AKeywords0.currentElement+","+AKeywords0.AStore+");"
					}
				}
				for (let i=0;i<attrsToRemove.length;i++) {
					lelement.removeAttribute(attrsToRemove[i]);
				}
				scripttext += AText + ABE.scriptTextEnd;
				if (addSourceMaps) {
					let srcmap = getPrivate(lelement).__sourcemap;
					if (lelement.__addSourceMaps!==false&&srcmap&&srcmap.sourcesContent&&srcmap.sourcesContent.length>0&&srcmap.sourcesContent[0].trim()!="") {
						srcmap.sources[0] = "a-closure."+lelement[APrivateDataKeyWords._aID]+".js";
				 		scripttext += "\n//# sourceMappingURL=data:text/a-script;charset=utf-8;base64," + bytesToBase64(new TextEncoder().encode((JSON.stringify(srcmap))))
				 	}
				}
				script.innerHTML = scripttext;
				if (bdelay) {
					makeWaitForParentAScriptsExecutionPromise(tagelement,true).then(res => {
						lelement.parentElement.insertBefore(script,element.nextSibling);
						delete script.__AGOOrphansIgnore
					});
				} else {
					lelement.parentElement.insertBefore(script,element.nextSibling);
					delete script.__AGOOrphansIgnore
				}
			})
		})();
	}

	class MyAScript extends HTMLElement {
	
	  constructor() {
	    super();
	  }
	
	  connectedCallback() {		  
		if (this[A._rndAClass]) {
			return;
		}
		this[A._rndAClass] = true;
		this.classList.add(A._rndANotParsedClass);
		let Athis = this;
		manageWaitFor(Athis).then(() => {
			if (manageSingleton(Athis)) return;
			let ATarget = getAElementTarget(Athis)
			ATarget.classList.add(A._rndANotParsedClass);
			  
		    requestAnimationFrame(() => { parseAScript(Athis)});
		})

	  }
	
	  disconnectedCallback() {
	  }
	
	  adoptedCallback() {
	  }
	
	}
	
	class MyAClosure extends HTMLElement {
	
	  constructor() {
	    super();
	  }
	
	  connectedCallback() {		  
		if (this[A._rndAClass]) {
			return;
		}
		this[A._rndAClass] = true;
		this.classList.add(A._rndANotParsedClass);
		let Athis = this;
		manageWaitFor(Athis).then(() => {
			if (manageSingleton(Athis)) return;
			let ATarget = getAElementTarget(Athis)
			ATarget.classList.add(A._rndANotParsedClass);
			  
		    requestAnimationFrame(() => { parseAScript(Athis,false,true)});
			
		})
	  }
	
	  disconnectedCallback() {
	  }
	
	  adoptedCallback() {
	  }
	
	}
	
	class MyATagDef extends HTMLElement {
	
	  constructor() {
	    super();
	  }
	
	  connectedCallback() {		  
		if (this[A._rndAClass]) {
			return;
		}
		let fortag = getAAttribute(this,AAttributes.forTag)
		if (fortag) {
			let isdefined = customElements.get(fortag)!=undefined
			if (isdefined) {
				let redef = getAAttribute(this,AAttributes.redefine)
				redef = redef!=undefined&&redef!=="false"
				if (!redef) {
					this.remove();
					return;
				}
			}
		}
		this.classList.add(A._rndANotParsedClass);
		this[A._rndAClass] = true;
		let Athis = this;
		manageWaitFor(Athis).then(() => {
			if (manageSingleton(Athis)) return;
			let pv = getPrivate(Athis);
			pv.__ascriptadded = true; //no target add for tagdefs
		    requestAnimationFrame(() => { parseAScript(Athis,false,true,{ tagDef : true})});
		})
		
	  }
	
	  disconnectedCallback() {
	  }
	
	  adoptedCallback() {
	  }
	
	}
	
	function initialized() {
		return AInitializedPromise;
	}
	A.initialized = initialized
	
	function allParsed() {
		return new Promise((resolve, reject) => {
			AInitializedPromise.then(() => {
				function delayUntilAllExecuted(count,stilltoexecute) {
					if (count>10000) {
						reject();
					}	
					let notExecutedYet = doc.querySelectorAll("." + A._rndANotParsedClass);
					if (notExecutedYet.length>0) {
						if (stilltoexecute.length==notExecutedYet.length&&stilltoexecute[0]==notExecutedYet[0]&&stilltoexecute[stilltoexecute.length-1]==notExecutedYet[notExecutedYet.length-1]) {
							count++;
						}
						setTimeout(function(){ delayUntilAllExecuted(count,notExecutedYet) },0)
					} else {
						resolve()
					}
				}	
				setTimeout(function(){ delayUntilAllExecuted(0,[]) },0)
			}).catch((e) => { reject(e)})
		})
	}
	A.allParsed = allParsed
	
	function initialize() {
		try {
			addExtensionScripts();
			forEachKeyWord(ACustomElements.AScript,function(kw) {
				createClass(kw,"display:none;")
				customElements.define(kw,class extends MyAScript{});
			})
			forEachKeyWord(ACustomElements.AClosure,function(kw) {
				createClass(kw,"display:none;")
				customElements.define(kw,class extends MyAClosure{});
			})
			forEachKeyWord(ACustomElements.ATagDef,function(kw) {
				createClass(kw,"display:none;")
				customElements.define(kw,class extends MyATagDef{});
			})
			AIsInitialized = true;
			AInitializedPromiseResolve(A);
		} catch (e) {
			AInitializedPromiseReject(e);
			throw e;
		}
	}
	
	function addExtensionScripts() {
		let extScripts = document.querySelectorAll("script[a-extension]")
		for (let i=0;i<extScripts.length;i++) {
			let script = extScripts[i];
			if (typeof(script._AExtension)!="object") {
				continue;
			}
			let ext = script._AExtension;
			if (ext.AParsedTagsTasks) {
				if (!ext.AParsedTagsTasks.length) {
					ext.AParsedTagsTasks = [ext.AParsedTagsTasks]
				}
				for (let j=0;j<ext.AParsedTagsTasks.length;j++) {
					let tag = ext.AParsedTagsTasks[j]
					if (!tag.function||!tag.selector) {
						console.warn("extension script error: for a tag extension, a {selector,function} object is required",script)
					}
					AInnerTagsJobs.push(tag)
				}
			}
			if (ext.TagCreationTasks) {
				if (!ext.TagCreationTasks.length) {
					ext.TagCreationTasks = [ext.TagCreationTasks]
				}
				for (let j=0;j<ext.TagCreationTasks.length;j++) {
					let tag = ext.TagCreationTasks[j]
					if (!tag.function) {
						console.warn("extension script error: for a template tag extension, a {function} object is required",script)
					}
					TemplateLiteralFullCreationJobs.push(tag)
				}		
			}
			if (ext.PostImportFetchTasks) {
				if (!ext.PostImportFetchTasks.length) {
					ext.PostImportFetchTasks = [ext.PostImportFetchTasks]
				}
				for (let j=0;j<ext.PostImportFetchTasks.length;j++) {
					let tag = ext.PostImportFetchTasks[j]
					if (!tag.function) {
						console.warn("extension script error: for a template tag extension, a {function} object is required",script)
					}
					APostImportFetchJobs.push(tag)
				}	
			}
		}
	}
	
	function waitForExtensionScripts() {
		try {
			if (document.readyState=="complete") {
				if (APromisesWaitForInitialize!=null) {
					Promise.all(APromisesWaitForInitialize).then(()=>{initialize()}).catch(()=>{initialize()})
				} else {
					initialize();
				}
			} else {
				if (document.readyState=="loading") {
					setTimeout(waitForExtensionScripts,0)
				} else {
					let extScripts = document.querySelectorAll("script[a-extension]")
					for (let i=0;i<extScripts.length;i++) {
						let script = extScripts[i];
						if (script._AExtension==undefined) {
							setTimeout(waitForExtensionScripts,0)
							return;
						}
					}
					initialize();
				}
			}
		} catch (e) {
			AInitializedPromiseReject(e);
			throw e;
		}
	}
	
	function waitForIntialize() {	
		if (AConfig.canInitializePromise instanceof Promise) {
			AConfig.canInitializePromise.then(() => waitForExtensionScripts()).catch(() => waitForExtensionScripts());
		} else {
			waitForExtensionScripts();
		}
	}
	try {
		waitForIntialize();
	} catch (e) {
		AInitializedPromiseReject(e);
		throw e;
	}
	
})(window,document)