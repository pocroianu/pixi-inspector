import blacklist from "./blacklist";
import whitelist from "./whitelist";
import Texture from "./Texture";
import BaseTexture from "./BaseTexture";
import Sprite from "./Sprite";
import Text from './Text';
import TextStyle from './TextStyle';
import Container from './Container';

const implementations = {
    Texture,
    BaseTexture,
    Sprite,
    Text,
    TextStyle,
    Container,
}

function constructorName(pixiObj) {
    return pixiObj.constructor.name;
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