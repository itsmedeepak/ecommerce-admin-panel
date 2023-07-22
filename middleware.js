import { NextResponse } from "next/server";
const secret = process.env.SECRETKEY;



export async function middleware(req) {
  try{
    const token = req.cookies.get("authToken").value;
    console.log(token)
  if(token==secret){
    return NextResponse.next();
  }

  const url = req.nextUrl.clone()
  url.pathname = '/'
  return NextResponse.redirect(url)
  }
  catch(e){
    const url = req.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
}
}

export const config = {
    matcher: ['/components']
}

