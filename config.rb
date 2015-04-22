# This is the configuration file for Compass (http://compass-style.org/)
# See http://compass-style.org/help/tutorials/configuration-reference/ on how to use this file

#environment     = :development
environment     = :production

css_dir         = "htdocs/css"
sass_dir        = "htdocs/sass"
images_dir      = "htdocs/images"
fonts_dir       = "htdocs/fonts"
javascripts_dir = "htdocs/js"
relative_assets = true

# The output style for the compiled css. One of: :nested, :expanded, :compact, or :compressed.
output_style    = (environment == :development) ? :expanded : :compact
sass_options    = {:debug_info => (environment == :development), :unix_newlines => true}
