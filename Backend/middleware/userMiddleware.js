

const isTokenExist = async(req,res,next) =>{
  try {

    const token = await req.headers.authorization
    console.log(req.headers.authorization , 'req.headers.authorization');

    if (!token) {
      return
    }
    req.token = token;
    next()

  } catch (error) {
    throw error;
  }
}

module.exports = {
  isTokenExist
}