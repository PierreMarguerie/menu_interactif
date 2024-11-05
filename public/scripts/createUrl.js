export async function createUrl(mapName, areaName)
{
    let url;
    if (areaName.includes(" ")) {
        console.log("Erreur: nom d'area contient des espaces")
        return window.location.href;
    }
    try {
        url = "https://mondevirtuel.univ-rennes2.fr/@/" + mapName + "#" + encodeURIComponent(areaName);
        const response = await fetch(url, { method: 'HEAD' });

        if (!response.ok) {
            console.log("Erreur: Le serveur a renvoyé un statut " + response.status);
            return window.location.href;
        }
    } catch (err) {
        console.log("Error has occured when trying to create url to asked resource: ", err);
        return window.location.href;
    }
    return url;
}
