const dataYear = async  () => {
    const ofertas = database.collection("ofertalaborals");

    // Estimate the total number of documents in the collection

    // and print out the count.

    const estimate = await ofertas.estimatedDocumentCount();
    console.log(estimate)
}

