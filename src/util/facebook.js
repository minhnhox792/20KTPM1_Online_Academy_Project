import FacebookStrategy from "passport-facebook";
import User from "../app/models/User.js";
import mongoose from 'mongoose'
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

export default function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
  
    done(null, user)
  });
  passport.use(
    new FacebookStrategy.Strategy(
      {
        clientID: "792552872531679",
        clientSecret: "0bc350accf28c3cbb49ce7c92b90bfe8",
        callbackURL: "http://localhost:3000/user/facebook/callback",
        profileFields : ['id', 'displayName', 'email','photos']
      },
      async function  (accessToken, refreshToken, profile, cb) { 
        process.nextTick(function () {
        if (profile.id) {

          User.findOne({ facebookId : profile.id  })
          .then((existingUser) => {
            console.log("Goooooooo")
            
            if (existingUser) {
              return cb(null, existingUser)
            } else {
              console.log("Go hereeeeeeeee")
              const salt = bcrypt.genSaltSync(10);
              const hashPass = bcrypt.hashSync(profile.id + 'loginFacebook@886', salt);
              User.findOne({email: profile.emails[0].value})
            .then((existEmail) => {
              if(existEmail){
                console.log(profile.emails[0].value)
                console.log('11111111111')
                return cb(null, profile)
              }
              else{
                const newUser = new User({
                  facebookId: profile.id,
                  email: profile.emails[0].value,
                  fullname: profile.displayName,
                  verified: true,
                  username: profile.id,
                  password: hashPass,
                  actived: true
                }); 
                console.log("The new user isssssss: ", newUser)
                newUser.save()
                .then((user) => {
                  return cb(null, user)
                }
                );
              }
                
            })
            
            }
          });
        }
        else{
          console.log("Không tồn tai")
      //   }
        }
      })
        
      }
  )
  )
}
