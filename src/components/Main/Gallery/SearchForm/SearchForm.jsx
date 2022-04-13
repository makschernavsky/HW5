/* eslint-disable comma-dangle */
/* eslint-disable indent */
import {
    useEffect,
    useRef,
    useState
} from 'react'
import { useSearchParams } from 'react-router-dom'

function SearchForm() {
  const [searchInput, setSearchInput] = useState('')
  const isMount = useRef(false)

  const [searchParams, setSearchParams] = useSearchParams()

  const changeHandler = (e) => {
    setSearchInput(e.target.value)
  }

  useEffect(() => {
    if (isMount.current) {
      const filter = {
        search: searchInput,
      }
      const prepareFilterForURL = encodeURIComponent(JSON.stringify(filter))
        const query = `filter=${prepareFilterForURL}`

      setSearchParams(query)
    } else {
      isMount.current = true

      const parsedQuery = JSON.parse(searchParams.get('filter'))

      if (parsedQuery && parsedQuery.search) {
        setSearchInput(parsedQuery.search)
      }
    }
  }, [searchInput])

  return (
    <form className="d-flex justify-content-center align-items-center py-10">
      <div className="mb-3">
        <input
          name="name"
          placeholder="Поиск по названию..."
          type="text"
          className="form-control"
          value={searchInput}
          onChange={changeHandler}
        />
      </div>
    </form>
  )
}
export default SearchForm
