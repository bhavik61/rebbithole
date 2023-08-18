from django import template
register = template.Library()

#@register.simple_tag
@register.simple_tag(takes_context=True)
def var(context, key, value):
    context.dicts[0][key] = value
    return ''

from django.template.defaultfilters import stringfilter

@register.filter
@stringfilter
def upto(value, delimiter=None):
    return value.split(delimiter)[0]
upto.is_safe = True