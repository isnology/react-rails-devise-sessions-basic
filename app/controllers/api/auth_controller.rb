class Api::AuthController < ApiController
  def index
    if user_signed_in?
      render :json => {signedIn: true, user: current_user}.to_json()
    else
      render :json => {signedIn: false}.to_json()
    end
  
  end
end
