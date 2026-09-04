// Newest first; projects from the same year keep the data order reversed.
export function sortProjects(projects) {
    return projects
        .map(function (project, index) {
            return { project, index }
        })
        .sort(function (a, b) {
            if (b['project']['year'] !== a['project']['year']) return b['project']['year'] - a['project']['year']
            return b['index'] - a['index']
        })
        .map(function (entry) {
            return entry['project']
        })
}
