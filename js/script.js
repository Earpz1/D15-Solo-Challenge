const displayMessage = function () {
  const update = new URLSearchParams(window.location.search).get('update')
  const add = new URLSearchParams(window.location.search).get('add')

  if (update) {
    document.querySelector('.success-update').classList.remove('d-none')
  }
  if (add) {
    document.querySelector('.success-add').classList.remove('d-none')
  }
}

const addMovie = async function () {
  const name = document.querySelector('#movieTitle').value
  const genre = document.querySelector('#movieGenre').value
  const description = document.querySelector('#movieDescription').value
  const imageURL = document.querySelector('#imageURL').value

  console.log(name + genre + description + imageURL)

  // Create the product object using the values assigned from above
  const newMovie = {
    name: name,
    description: description,
    category: genre,
    imageUrl: imageURL,
  }
  try {
    const response = await fetch(
      'https://striveschool-api.herokuapp.com/api/movies/',
      {
        method: 'POST',
        body: JSON.stringify(newMovie),
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZWIwNmQ0YmUzZDAwMTU4NDVmY2EiLCJpYXQiOjE2NjgwODI0MzgsImV4cCI6MTY2OTI5MjAzOH0.DpZeoylxUK0l0ShW1v73YKIhA7_EKtIEMO9MzBKR_eE',
        },
      },
    )

    if (response.ok) {
      window.location.assign('backoffice.html?add=success')
    } else {
      throw new Error('Movie was not added')
    }
  } catch (error) {
    const errorMessage = document.querySelector('.error-message')
    errorMessage.innerHTML = error
  }
}

const getGenre = async () => {
  try {
    const response = await fetch(
      'https://striveschool-api.herokuapp.com/api/movies/',
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZWIwNmQ0YmUzZDAwMTU4NDVmY2EiLCJpYXQiOjE2NjgwODI0MzgsImV4cCI6MTY2OTI5MjAzOH0.DpZeoylxUK0l0ShW1v73YKIhA7_EKtIEMO9MzBKR_eE',
        },
      },
    )

    if (response.ok) {
      const movies = await response.json()

      movies.forEach((element) => {
        getMovies(element)
      })
    } else {
      throw new Error('Error')
    }
  } catch (error) {
    console.log(error)
  }
}

const getMovies = async function (genre) {
  const movieID = new URLSearchParams(window.location.search).get('editMovie')

  if (movieID) {
    const genre = new URLSearchParams(window.location.search).get('genre')

    const response = await fetch(
      'https://striveschool-api.herokuapp.com/api/movies/' + genre,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZWIwNmQ0YmUzZDAwMTU4NDVmY2EiLCJpYXQiOjE2NjgwODI0MzgsImV4cCI6MTY2OTI5MjAzOH0.DpZeoylxUK0l0ShW1v73YKIhA7_EKtIEMO9MzBKR_eE',
        },
      },
    )

    const movie = await response.json()
    const filter = movie.find((x) => x._id == movieID)
    console.log(filter.name)

    document.querySelector('#movieTitle').value = filter.name
    document.querySelector('#movieGenre').value = filter.category
    document.querySelector('#movieDescription').value = filter.description
    document.querySelector('#imageURL').value = filter.imageUrl
  }
  try {
    const response = await fetch(
      'https://striveschool-api.herokuapp.com/api/movies/' + genre,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZWIwNmQ0YmUzZDAwMTU4NDVmY2EiLCJpYXQiOjE2NjgwODI0MzgsImV4cCI6MTY2OTI5MjAzOH0.DpZeoylxUK0l0ShW1v73YKIhA7_EKtIEMO9MzBKR_eE',
        },
      },
    )
    if (response.ok) {
      const movies = await response.json()

      movies.forEach((element) => {
        showMovie(element)
      })
    } else {
      throw new Error('Error')
    }
  } catch (error) {
    console.log(error)
  }
}

const showMovie = function (movie) {
  const container = document.querySelector('.moviesList')

  const newRow = document.createElement('div')
  newRow.classList.add('row')

  const newCol = document.createElement('div')
  newCol.classList.add('col-md-4')

  const newTitle = document.createElement('strong')
  newTitle.innerHTML = movie.name

  const newDescription = document.createElement('div')
  newDescription.classList.add('col-md-6')
  newDescription.innerHTML = movie.description

  const buttonsCol = document.createElement('div')
  buttonsCol.classList.add('col-md-2')

  const flex = document.createElement('div')
  flex.classList.add('d-flex', 'align-items-right', 'justify-content-end')

  const editLink = document.createElement('a')
  editLink.classList.add('text-primary', 'mr-5')
  editLink.setAttribute(
    'href',
    'update.html?editMovie=' + movie._id + '&genre=' + movie.category,
  )

  const deleteLink = document.createElement('a')
  deleteLink.classList.add('text-danger', 'mr-5')
  deleteLink.setAttribute('href', '?deleteMovie=' + movie._id)

  const deleteIcon = document.createElement('i')
  deleteIcon.classList.add('fa-solid', 'fa-trash')

  const editIcon = document.createElement('i')
  editIcon.classList.add('fa-solid', 'fa-pen-to-square')

  const linkBreak = document.createElement('hr')

  newCol.appendChild(newTitle)
  newRow.appendChild(newCol)
  newRow.appendChild(newDescription)
  newRow.appendChild(buttonsCol)
  container.appendChild(newRow)
  container.appendChild(linkBreak)
  buttonsCol.appendChild(flex)
  flex.appendChild(editLink)
  flex.appendChild(deleteLink)
  editLink.appendChild(editIcon)
  deleteLink.appendChild(deleteIcon)
}

const deleteMovie = async function () {
  const movieID = new URLSearchParams(window.location.search).get('deleteMovie')

  if (!movieID) {
    return
  }

  const response = await fetch(
    'https://striveschool-api.herokuapp.com/api/movies/' + movieID,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZWIwNmQ0YmUzZDAwMTU4NDVmY2EiLCJpYXQiOjE2NjgwODI0MzgsImV4cCI6MTY2OTI5MjAzOH0.DpZeoylxUK0l0ShW1v73YKIhA7_EKtIEMO9MzBKR_eE',
      },
    },
  )
}

const updateMovie = async function () {
  const movieID = new URLSearchParams(window.location.search).get('editMovie')

  const name = document.querySelector('#movieTitle').value
  const description = document.querySelector('#movieDescription').value
  const category = document.querySelector('#movieGenre').value
  const imageURL = document.querySelector('#imageURL').value

  const newMovie = {
    name: name,
    description: description,
    category: category,
    imageUrl: imageURL,
  }

  try {
    const response = await fetch(
      'https://striveschool-api.herokuapp.com/api/movies/' + movieID,
      {
        method: 'PUT',
        body: JSON.stringify(newMovie),
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZWIwNmQ0YmUzZDAwMTU4NDVmY2EiLCJpYXQiOjE2NjgwODI0MzgsImV4cCI6MTY2OTI5MjAzOH0.DpZeoylxUK0l0ShW1v73YKIhA7_EKtIEMO9MzBKR_eE',
        },
      },
    )

    if (response.ok) {
      window.location.assign('backoffice.html?update=success')
    } else {
      throw new Error('Film was not updated')
    }
  } catch (error) {
    const errorMessage = document.querySelector('.error-message')
    errorMessage.innerHTML = error
  }
}

const homePageGenre = async function () {
  try {
    const response = await fetch(
      'https://striveschool-api.herokuapp.com/api/movies/',
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZWIwNmQ0YmUzZDAwMTU4NDVmY2EiLCJpYXQiOjE2NjgwODI0MzgsImV4cCI6MTY2OTI5MjAzOH0.DpZeoylxUK0l0ShW1v73YKIhA7_EKtIEMO9MzBKR_eE',
        },
      },
    )

    if (response.ok) {
      const movies = await response.json()

      movies.forEach((element) => {
        homePageMovies(element)
      })
    } else {
      throw new Error('Error')
    }
  } catch (error) {
    console.log(error)
  }
}

const homePageMovies = async function (genre) {
  bodyContainer = document.querySelector('.movies')
  bodyContainer.innerHTML += `
  <div class="movie-gallery m-2">
        <h5 class="text-light mt-2 mb-2">${genre}</h5>
        <div id="trending-now" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="movie-row">
                <div class="row" id=${genre}>
                  
                </div>
              </div>
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#trending-now"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#trending-now"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>`

  const response = await fetch(
    'https://striveschool-api.herokuapp.com/api/movies/' + genre,
    {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZjZWIwNmQ0YmUzZDAwMTU4NDVmY2EiLCJpYXQiOjE2NjgwODI0MzgsImV4cCI6MTY2OTI5MjAzOH0.DpZeoylxUK0l0ShW1v73YKIhA7_EKtIEMO9MzBKR_eE',
      },
    },
  )

  const movies = await response.json()

  movies.forEach((element) => {
    const container = document.querySelector('#' + genre)

    const newCol = document.createElement('div')
    newCol.classList.add('col-md-2')

    const newImage = document.createElement('img')
    newImage.classList.add('movie-cover')
    newImage.setAttribute('src', element.imageUrl)

    newCol.appendChild(newImage)
    container.appendChild(newCol)
  })
}
