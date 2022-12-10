import ServiceCard from "../../components/ServiceCard/ServiceCard"

function SearchResultsPages({ searchResults }) {

    console.log({ searchResults })
    const results = searchResults?.map(service => <ServiceCard {...service} />)
    const content = results?.length ? results : <article><p>No Matching Posts</p></article>

    return (
        <main>
            {content}

        </main>


    )



}

export default SearchResultsPages