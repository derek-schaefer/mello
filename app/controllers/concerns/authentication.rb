module Authentication
  extend ActiveSupport::Concern

  included do
    before_action :current_user
    helper_method :current_user, :signed_in?
  end

  def authenticate_user
    return if signed_in?
    respond_to do |f|
      f.html { redirect_to new_session_path }
      f.json { render json: nil, status: :unauthorized }
    end
  end

  def signed_in?
    current_user.present?
  end

  def current_user
    return unless session[:user_id]
    @current_user ||= User.find(session[:user_id])
  end
end
