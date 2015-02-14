# coding: utf-8
from flask import g, request, url_for, current_app

# new function for jinja2  :D

def append_get_url(**new_args):
    args = request.args.copy()
    for item in new_args.keys():
        if item in args:
            del args[item]
    args.update(new_args)
    return url_for(request.endpoint, **args)


def ref_url():
    ref_url = (request.path)
    return ref_url


def __dir(obj):
    return dir(obj)

def static():
    return current_app.static_url_path + "/"

def init_filters(app):
    app.jinja_env.globals['append_get_url'] = append_get_url
    app.jinja_env.globals['ref_url'] = ref_url
    app.jinja_env.globals['dir'] = __dir
    app.jinja_env.globals['static'] = static
