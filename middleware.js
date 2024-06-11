let count = 0;

export const counterMiddleware = (req, res, next) => {
  count++;
  req.counter = count;
  next();
}

export const loggerMiddleware = (req, res, next) => {
  const counter = req.counter || 0
  const method = req.method.toUpperCase()
  const path = req.path
  const query = isEmpty(req.query) ? "" : JSON.stringify(req.query)
  const body = isEmpty(req.body) ? "" : JSON.stringify(req.body)
  
  console.log(`${counter}) ${method} ${path} ${query} ${body}`)
  
  next()
}

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0
}