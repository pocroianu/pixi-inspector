import blacklist from "./blacklist";
import whitelist from "./whitelist";
import Texture from "./Texture";
import BaseTexture from "./BaseTexture";
import Sprite from "./Sprite";
import Text from './Text';
import TextStyle from './TextStyle';

const implementations = {
    Texture,
    BaseTexture,
    Sprite,
    Text,
    TextStyle,
}

function constructorName(pixiObj, baseConsturctor = null, deep = 5) {
    let cntName = pixiObj.constructor.name;
    const bconst = baseConsturctor || cntName;
    if (deep < 0) {
        return baseConsturctor || cntName;
    } else {
        deep--;
    }
    if (implementations.hasOwnProperty(cntName)) {
        return cntName;
    }
    if (pixiObj.__proto__) {
        return constructorName(pixiObj.__proto__, bconst, deep);
    } else {
        return baseConsturctor;
    }
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function prepareList(draftList) {
    return clearArray(draftList, blacklist)
            .filter(onlyUnique);
}

function clearArray(arr, rmList) {
    rmList.forEach(searchTerm => {
        const index = arr.indexOf(searchTerm);
        if (index !== -1) {
            arr.splice(index, 1);
        }
    });
    return arr;
}

export default function(pixiObj) {
    const type = constructorName(pixiObj);
    const properties = (implementations[type]) ? implementations[type].concat(whitelist) : whitelist;
    return prepareList(properties);
}