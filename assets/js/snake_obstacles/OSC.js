//from R.Nixons book 'Learning PHP MySQL & Javascript'


// export function O(i) { return typeof i == 'object' ? i : document.getElementById(i) }
// export function S(i) { return O(i).style                                            }
// export function C(i) { return document.getElementsByClassName(i)                    }


function O(i) { return typeof i == 'object' ? i : document.getElementById(i) }
function S(i) { return O(i).style                                            }
function C(i) { return document.getElementsByClassName(i)   }