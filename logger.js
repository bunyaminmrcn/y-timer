const prettyPrint = (payload) => {
    console.log(JSON.stringify(payload, 0, 2))
}

module.exports ={ prettyPrint }