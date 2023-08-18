# Generated by Django 3.1.7 on 2021-04-28 09:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('post', '0007_auto_20210424_2322'),
        ('message', '0002_auto_20210427_1417'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(db_index=True, editable=False)),
                ('c', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='c', to='post.comment')),
                ('f', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('r', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='r', to='post.comment')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL)),
                ('v_c', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='v_c', to='post.comment')),
                ('v_p', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='v_p', to='post.post')),
            ],
        ),
    ]
