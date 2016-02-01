class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(username: user_params[:username])
    if user && user.authenticate(user_params[:password])
      session[:user_id] = user.id
      cookies.signed[:user_id] = user.id
      flash[:notice] = t(:session_valid)
      redirect_to root_path
    else
      flash[:alert] = t(:session_invalid)
      render :new
    end
  end

  def destroy
    @current_user = nil
    session.delete(:user_id)
    redirect_to new_session_path
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
