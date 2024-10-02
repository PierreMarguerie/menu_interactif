export async function createUrl(mapName, areaName)
{
    let url;
    if (areaName.includes(" ")) {
        console.log("Erreur: nom d'area contient des espaces")
        return window.location.href;
    }
    try {
        url = "https://mondevirtuel.univ-rennes2.fr/@/" + mapName + "#" + encodeURIComponent(areaName);
    } catch (err) {
        console.log("Error has occured when trying to create url to asked resource: ", err);
        return window.location.href;
    }
    return url;
}
