package com.mygdx.game.actor;

import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.Batch;
import com.badlogic.gdx.scenes.scene2d.Actor;
import com.mygdx.game.MyGdxGame;

public class Earth extends Actor {


	Texture earth = new Texture("earth.png");
	
	@Override
	public void draw(Batch batch, float parentAlpha) {
		batch.draw(earth, MyGdxGame.WIDTH / 2 - earth.getWidth() / 2, MyGdxGame.HEIGHT / 2 - earth.getHeight() / 2);
	}
}
