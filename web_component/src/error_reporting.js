import Consts from "./consts";

function showError(e) {
    alert(`Error encountered! (Screenshot this in a bug report!):\nLiquilt v${Consts.version}\n${e.message}[${e.lineNumber}]`);
}

export default function() {
    window.addEventListener('unhandledrejection', function (e) {
        showError(e.reason)
    });
    window.addEventListener('error', function(e) {
        console.log('e', e);
        showError(e.error)
        return false;
    });
}