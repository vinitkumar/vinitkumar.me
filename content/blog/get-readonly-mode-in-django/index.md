---
date: 2014-05-18
layout: post
title: "Implementing Read-Only Access in Django Admin: A Complete Guide"
description: "Guide to setup readonly mode for some users in Django admin"
category: articles
tags: Python Django Django-admin
comments: false
--- 

Last week, I came across an interesting problem at work. The problem was: > To get read only users in a Django based application. But doing so was not very simple because there is no read only mode for users
in Django. In order to solve this, I first started reading answers on stack
overflow. Some of those links did pointed me to a correct route. Here, I will
document the whole process so that it could help others and serve as a reminder
for me as well. First of all, the whole system of authentication in any system originates from
permissions. The basis permissions are. Read, Write, Execute. in Unix (chmod is
used to set permissions). Django has a cool way of adding the permissions in the meta class. Let's say we
have a model class named Cars. ```Python
class Cars(model. Model): name = models. Charfield() year = models. DateField() class Meta: permissions = ( ('readonly', 'Can Read Only Cars') )
``` Just like this, Any permission could be added to the Model. Now in order to get
these permissions in the database. You need to run syncdb management command. ```sh
Python manage. py syncdb --all
``` So this just sets the background in place. The real job is getting this
permissions to work. Now, I began to wonder what all things were required to develop this complete
functionality? The first thing that came to my mind naturally was to override templates and
hack ground admin. py. So, I created a new class in Admin. py that was inherited from the admin class
I was earlier using: ```Python
from model import Cars class CarAdmin(admin. ModelAdmin): date_hierarchy = 'date' list_filter = ('status', 'event_instance',) actions = ['accept', 'reject', 'pending'] class ReadonlyCarAdmin(CarAdmin): def __init__(self, model, admin_site): super(ReadonlyCarAdmin, self).__init__(model, admin_site) self. model = model def has_delete_permission(self, request, obj=None): if request. user. has_perm('car. readonly') and not request. user. is_superuser: return False else: return True def has_add_permission(self, request, obj=None): if request. user. has_perm('car. readonly') and not request. user. is_superuser: return False else: return True def has_change_permission(self, request, obj=None): if request. user. is_superuser: self. readonly_fields = () # make sure to remove caching. return True elif request. user. has_perm('car. readonly'): # make the fields readonly for only users with readonly permissions. self. readonly_fields = [field. name for field in filter(lambda f: not f. auto_created, self. model._meta. fields)] return True else: return False def get_actions(self, request): actions = super(ReadOnlyCarAdmin, self).get_actions(request) if request. user. has_perm('car. readonly') and not request. user. is_superuser: # This ensures that that user doesn't not have any actions if 'delete_selected' in actions: del actions['delete_selected'] del actions['accept'] del actions['reject'] del actions['pending'] return actions else: return actions admin_site. register(Car, ReadonlyCarAdmin)
``` Okay, so now we have a robust system in place to ensure whichever user has
readonly permission on Cars Model would only be able to see the model data in
Readonly mode. But this is not it. Here is the part where templates are overridden. First of all save and cancel button on buttom needs to go as we don't need
them. For that, create a new template in templates folder. The templates name is ` change_form. HTML`.
Hence the full pathname is ` carapp/templates/admin/change_form. HTML`. Copy the content from the default Django template (/admin/change_form. HTML) in Django project
add replace this content with this gist: <script src="https://gist. GitHub. com/vinitkumar/48a9cd0c2e35e033659c. JS"></script> This will ensure that the selected user with this readonly only permissions won't be able
get the submit button on his admin page. Now, you have a fully functioning Django Admin with readonly mode. The main effort was to make it
very easy to use and ensure that this feature could run across future versions. Hope this post help anyone else who has to implement something similar. 