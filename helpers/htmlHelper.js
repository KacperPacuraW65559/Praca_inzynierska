
import { permissions } from "../utility/permissions.js";

class HtmlHelper {
    getSelectIdCodeFromArr(arr, selectName, propertyToShow, id, className, selectedId = -1) {
        if (!Array.isArray(arr) || arr.length === 0) {
            return `<select name="${selectName}" id="${id}" class="${className}"></select>`;
        }

        let idCode = id ? `id="${id}"` : "";
        let html = `<select name="${selectName}" ${idCode} class="${className}">`;

        for (const el of arr) {
            let selected = selectedId === el.id ? `selected` : "";
            html += `\n <option value="${el.id}" ${selected}> ${el[propertyToShow]} </option>`;
        }

        return html + `\n</select>`;
    }

    getSelectCodeFromArr(arr, selectName, id, className, selectedValue) {
        if (!Array.isArray(arr) || arr.length === 0) {
            return `<select name="${selectName}" id="${id}" class="${className}"></select>`;
        }

        let idCode = id ? `id="${id}"` : "";
        let html = `<select name="${selectName}" ${idCode} class="${className}">`;

        for (const str of arr) {
            let selected = selectedValue === str ? "selected" : "";
            html += `\n <option value="${str}" ${selected}>${str}</option>`;
        }

        return html + "\n</select>";
    }


    getElValueFromArrById(arr, id, propertyToShow = "id") {
        if (!Array.isArray(arr)) return null;

        for (const el of arr) {
            if (el.id === id) return el[propertyToShow];
        }

        return null;
    }

    getLinkCodeForUserRoleOrHigher(userRole, minRoleForLink = "admin", href, linkText, className = "") {
        const userPriority = permissions.getPriorityByRole(userRole);
        const minRolePriorityToSeeLink = permissions.getPriorityByRole(minRoleForLink);

        return userPriority >= minRolePriorityToSeeLink
            ? `<a href="${href}" class="${className}">${linkText}</a>`
            : "";
    }

    hasAccessForUserRoleOrHigher(userRole, minRoleForAccess = "admin") {
        const userPriority = permissions.getPriorityByRole(userRole);
        const minRolePriorityToSeeLink = permissions.getPriorityByRole(minRoleForAccess);

        return userPriority >= minRolePriorityToSeeLink;
    }
}

const htmlHelper = new HtmlHelper();

export { htmlHelper };
