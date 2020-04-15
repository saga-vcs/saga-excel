


function equal(a, b) {
    return (a === b) ? 1 : 0;
}


export function longestCommonSubsequence(aValues, bValues) {
    // If the values are undefined or null, no lcs exists
    if (!aValues || !bValues) {
        return [];
    }

    // aValues, bValues are arrays; this builds a longest common subsequence out of them
    const m = aValues.length;
    const n = bValues.length;

    // Make our cache array
    let L = new Array();
    for (let i = 0; i < m + 1; i++) {
        L.push(new Array(n + 1));
    }


    for (let i = 0; i < m + 1; i++) {
        for (let j = 0; j < n + 1; j++) {
            if (i == 0 || j == 0) {
                L[i][j] = 0
            } else {
                L[i][j] = Math.max(
                    equal(aValues[i - 1], bValues[j - 1]) + L[i - 1][j - 1],
                    L[i - 1][j],
                    L[i][j - 1]
                )
            }

        }
    }

    // Now, we back track to actually build the mapping

    let matches = new Array();

    let i = m
    let j = n
    while (i > 0 && j > 0) {
        if (equal(aValues[i - 1], bValues[j - 1]) + L[i - 1][j - 1] > Math.max(L[i - 1][j], L[i][j - 1])) {
            matches.push(
                [i - 1, j - 1, equal(aValues[i - 1], bValues[j - 1])]
            )
            i -= 1;
            j -= 1;
        } else if (L[i-1][j] > L[i][j-1]) {
            i -= 1
        } else {
            j -= 1
        }
    }

    matches.reverse()

    return matches
}

export function sim(a, b) {

    if (!a || !b) {
        return a === b ? 1 : 0;
    }

    if (a.length === 0 || b.length === 0) {
        return a.length === b.length ? 1 : 0;
    }
    
    const numShared = a.filter(function(el) {
        return b.indexOf(el) >= 0;
    }).length;

    return numShared * 2 / (a.length + b.length);
}


export function longestCommonSubsequence2d(aValues, bValues) {

    // If the values are undefined or null, no lcs exists
    if (!aValues || !bValues) {
        return [];
    }

    if (aValues.length === 0 || bValues.length === 0) {
        return [];
    }

    // aValues, bValues are arrays with arrays in them
    // we first build a mapping between these nested arrays    
    const n = aValues.length;
    const m = bValues.length;

    // Make our cache array
    let L = new Array();
    for (let i = 0; i < m + 1; i++) {
        L.push(new Array(n + 1));
    }

    for (let i = 0; i < m + 1; i++) {
        for (let j = 0; j < n + 1; j++) {
            if (i == 0 || j == 0) {
                L[i][j] = 0

            } else {
                L[i][j] = Math.max(
                    sim(aValues[i - 1], bValues[j - 1]) + L[i - 1][j - 1],
                    L[i - 1][j],
                    L[i][j - 1]
                )
            }

        }
    }

    // Now, we back track to actually build the mapping

    let matches = new Array();

    let i = m
    let j = n
    while (i > 0 && j > 0) {
        if (sim(aValues[i - 1], bValues[j - 1]) + L[i - 1][j - 1] > Math.max(L[i - 1][j], L[i][j - 1])) {
            matches.push(
                [i - 1, j - 1, sim(aValues[i - 1], bValues[j - 1])]
            )
            i -= 1;
            j -= 1;
        } else if (L[i-1][j] > L[i][j-1]) {
            i -= 1
        } else {
            j -= 1
        }
    }

    matches.reverse()

    return matches
}