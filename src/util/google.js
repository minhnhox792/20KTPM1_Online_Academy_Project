import GoogleStrategy from "passport-google-oauth2";
import User from "../app/models/User.js";
import bcrypt from "bcryptjs";

export default function (passport){
  const GOOGLE_CLIENT_ID =
  "305413841510-t8ovebqtl0mblv3bi1tpctcdckdkie4u.apps.googleusercontent.com";
  const GOOGLE_CLIENT_SECRET = "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";

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      done(null, user);
    });
  });

  passport.use(
    new GoogleStrategy.Strategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/user/google/callback",
        //   passReqToCallback: true,
      },
      (req, token, resToken, profile, done) => {
        console.log(token)
      //   console.log(2222222, profile.id)
        if (profile.id) {
          console.log("Hasssssss iddddddddd")
          User.findOne({ googleId: profile.id })
          .then((existingUser) => {
            if (existingUser) {
              return done(null, existingUser)
            } else {
              console.log("Go hereeeeeeeee")
              const salt = bcrypt.genSaltSync(10);
              const hashPass = bcrypt.hashSync('loginwithgoogle@886', salt);
              User.find({email: profile.emails[0].value})
            .then(existEmail => {
              console.log("Checked: ", existEmail)
              if(existEmail.length != 0){
                return done(null, existingUser)
              }
              else{
                const newUser = new User({
                  googleId: profile.id,
                  email: profile.emails[0].value,
                  fullname: profile.name.familyName + " " + profile.name.givenName,
                  verified: true,
                  username: profile.id,
                  password: hashPass,
                  actived: true
                });
                console.log("The new user isssssss: ", newUser)
                newUser.save()
                .then((user) => {
                  
                  return done(null, user)
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
  );
}
