# Generated by Django 3.1.7 on 2021-04-21 16:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0002_auto_20210420_1959'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='vote_count',
            field=models.IntegerField(blank=True, default=0),
        ),
    ]
