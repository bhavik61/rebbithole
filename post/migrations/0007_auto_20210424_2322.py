# Generated by Django 3.1.7 on 2021-04-24 17:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0006_member'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rebbithole',
            name='avatar',
            field=models.ImageField(default='avatar/rh_a.jpg', upload_to='rebbilehole/'),
        ),
    ]
